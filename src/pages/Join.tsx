import Form from '@/components/join/Form';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

import { FormValues } from '@/model/signup';
import { auth, db } from '@/remote/firebase';
import COLLECTIONS from '@/constants';
const Join = () => {
  const handleSubmit = async (formValues: FormValues) => {
    const { email, password, name } = formValues;
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(user, {
      displayName: name,
    });

    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: name,
    };
    await setDoc(doc(collection(db, COLLECTIONS.USER), user.uid), newUser);
  };

  return <Form onSubmit={handleSubmit} />;
};

export default Join;
