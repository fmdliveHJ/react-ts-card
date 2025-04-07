import { css } from '@emotion/react';
import './App.css';
import { typographyMap } from './styles/typography';
function App() {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        min-height: 100vh;
      `}
    >
      <h2 css={typographyMap.t1}>hello</h2>
    </div>
  );
}

export default App;
