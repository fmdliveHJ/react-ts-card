import styled from '@emotion/styled';
import { useUser } from '@/hooks/auth/useUser';
import { getAuth, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, db, app } from '@/remote/firebase';
import { collection, doc, updateDoc } from 'firebase/firestore';
import COLLECTIONS from '@/constants';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/atoms/user';

const MyPageImage = ({
  size = 40,
  mode = 'default',
}: {
  size?: number;
  mode?: 'default' | 'upload';
}) => {
  const user = useUser();
  const setUser = useSetRecoilState(userAtom);
  const handleImageUplaodChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;

    const currentUser = getAuth(app).currentUser;

    if (files == null || user == null || currentUser == null) {
      return;
    }

    const file = files[0].name;
    const storageRef = ref(storage, `users/${user.uid}/${file}`);
    const upload = await uploadBytes(storageRef, files[0]);

    const donwLoadUrl = await getDownloadURL(upload.ref);

    await updateProfile(currentUser, {
      photoURL: donwLoadUrl,
    });

    await updateDoc(doc(collection(db, COLLECTIONS.USER), currentUser.uid), {
      photoURL: donwLoadUrl,
    });

    setUser({
      ...user,
      photoURL: donwLoadUrl,
    });
  };

  return (
    <Container>
      <img
        src={
          user?.photoURL ||
          'https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-64.png'
        }
        alt='profile'
        width={size}
        height={size}
      />
      {mode === 'upload' && (
        <input
          type='file'
          accept='image/*'
          onChange={handleImageUplaodChange}
        />
      )}
    </Container>
  );
};

export default MyPageImage;

const Container = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  & img {
    border-radius: 100%;
  }

  & input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`;
