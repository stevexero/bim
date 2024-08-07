import { useState } from 'react';
import Scanner from './Scanner';

function App() {
  const [screen, setScreen] = useState('main');
  const [title, setTitle] = useState('BIM');
  const [subTitle, setSubTitle] = useState('BoxValet Inventory Management');

  const handleClick = (e) => {
    setScreen(e.target.id);
    let words = e.target.name.split(',');
    setTitle(words[0]);
    setSubTitle(words[1]);
  };

  return (
    <div className='w-screen p-4'>
      <div className='w-full'>
        <h1 className='font-bold text-center'>{title}</h1>
        <p className='text-center'>{subTitle}</p>
        {screen === 'main' ? (
          <div className='w-full border grid grid-cols-2 gap-2 p-4 mt-4'>
            <button
              id='scanner'
              name='Scanner,Scan Barcode'
              className='btn btn-lg btn-primary text-white'
              onClick={handleClick}
            >
              Scanner
            </button>
            <button
              id='scanner'
              name='Future Button,Future Subtitle'
              className='btn btn-lg btn-primary text-white'
            >
              Future Button
            </button>
          </div>
        ) : (
          screen === 'scanner' && (
            <>
              <div className='absolute top-4 left-4'>
                <button
                  id='main'
                  name='BIM,BoxValet Inventory Management'
                  className='btn btn-circle btn-primary text-white'
                  onClick={handleClick}
                >
                  &lt;
                </button>
              </div>
              <div className='mt-4'>
                <Scanner />
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default App;
