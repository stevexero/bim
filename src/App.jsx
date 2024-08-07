import { useState } from 'react';
import Scanner from './Scanner';

function App() {
  const [screen, setScreen] = useState('main');

  const handleClick = (e) => {
    setScreen(e.target.id);
  };

  return (
    <div>
      {screen === 'main' ? (
        <>
          <button id='scanner' onClick={handleClick}>
            Scanner
          </button>
        </>
      ) : (
        screen === 'scanner' && (
          <>
            <button id='main' onClick={handleClick}>
              Home
            </button>
            <Scanner />
          </>
        )
      )}
    </div>
  );
}

export default App;
