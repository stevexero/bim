import { useState, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { GoHomeFill, GoTriangleLeft } from 'react-icons/go';
import Scanner2 from './Scanner2';
import useBarCodeStore from './store';
import Home from './routes/Home';
import Layout from './components/Layout';
import Receiving from './routes/Receiving';
import Scanner from './routes/Scanner';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='receiving' element={<Receiving />} />
          <Route path='receiving/scanner' element={<Scanner />} />
        </Route>
      </Routes>
    </>
  );
  //   const barCode = useBarCodeStore((state) => state.barCode);
  //   const isScannerRunning = useBarCodeStore((state) => state.isScannerRunning);
  //   const setScannerRunning = useBarCodeStore((state) => state.setScannerRunning);
  //   const qrCodeRef = useRef(null);

  //   const [screen, setScreen] = useState('main');
  //   const [title, setTitle] = useState('BIM');
  //   const [subTitle, setSubTitle] = useState('BoxValet Inventory Management');
  //   const [history, setHistory] = useState(['main']);

  //   const stopScanner = async () => {
  //     if (qrCodeRef.current && isScannerRunning) {
  //       try {
  //         await qrCodeRef.current.stop();
  //         qrCodeRef.current.clear();
  //         setScannerRunning(false);
  //       } catch (error) {
  //         console.error('Failed to stop scanning', error);
  //       }
  //     }
  //   };

  //   const handleClick = async (e) => {
  //     const newScreen = e.target.id;
  //     if (e.target.name) {
  //       const words = e.target.name.split(',');
  //       setTitle(words[0]);
  //       setSubTitle(words[1]);
  //     }
  //     if (screen === 'scanner') {
  //       await stopScanner();
  //     }
  //     setHistory([...history, newScreen]);
  //     setScreen(newScreen);
  //   };

  //   const handleHomeClick = async () => {
  //     if (screen === 'scanner') {
  //       await stopScanner();
  //     }
  //     setTitle('BIM');
  //     setSubTitle('BoxValet Inventory Management');
  //     setHistory(['main']);
  //     setScreen('main');
  //   };

  //   const handleBackClick = async () => {
  //     const newHistory = [...history];
  //     newHistory.pop();
  //     const previousScreen = newHistory[newHistory.length - 1];
  //     if (screen === 'scanner') {
  //       await stopScanner();
  //     }
  //     setHistory(newHistory);
  //     setScreen(previousScreen);
  //   };

  //   const HomeButton = () => (
  //     <div className='absolute top-4 right-4'>
  //       <button
  //         id='main'
  //         className='btn btn-circle btn-error text-white'
  //         onClick={handleHomeClick}
  //       >
  //         <GoHomeFill className='text-white' size='2rem' />
  //       </button>
  //     </div>
  //   );

  //   const BackButton = () => (
  //     <div className='absolute top-4 left-4'>
  //       <button
  //         className='btn btn-circle btn-error text-white'
  //         onClick={handleBackClick}
  //       >
  //         <GoTriangleLeft className='text-white mr-[6px] -mt-[1px]' size='3rem' />
  //       </button>
  //     </div>
  //   );

  //   return (
  //     <div className='w-screen max-w-lg p-4 mx-auto relative'>
  //       <div className='w-full'>
  //         <h1 className='font-bold text-center'>{title}</h1>
  //         <p className='text-center'>{subTitle}</p>
  //         {screen === 'main' ? (
  //           <div className='w-full border grid grid-cols-2 gap-2 p-4 mt-4'>
  //             {/* <button
  //               id='receiving'
  //               name='Receiving,Incoming Merchandise'
  //               className='btn btn-lg btn-error text-white'
  //               onClick={handleClick}
  //             >
  //               Receiving
  //             </button> */}
  //             <Link to='receiving'>Receiving</Link>
  //           </div>
  //         ) : screen === 'receiving' ? (
  //           <>
  //             <BackButton />
  //             <HomeButton />
  //             <div className='w-full border grid grid-cols-2 gap-2 p-4 mt-4'>
  //               <button
  //                 id='scanner'
  //                 name='Scanner,Scan Barcode'
  //                 className='btn btn-lg btn-error text-white'
  //                 onClick={handleClick}
  //                 disabled={!isMobile}
  //               >
  //                 {!isMobile ? 'Mobile Only' : 'Scanner'}
  //               </button>
  //               <button
  //                 id='future'
  //                 name='Future Button,Future Subtitle'
  //                 className='btn btn-lg btn-outline btn-error text-white'
  //               >
  //                 Future Button
  //               </button>
  //             </div>
  //           </>
  //         ) : (
  //           screen === 'scanner' && (
  //             <>
  //               <BackButton />
  //               <HomeButton />
  //               <div className='mt-4'>
  //                 <Scanner2 qrCodeRef={qrCodeRef} />
  //                 <p className='mt-4'>Code: {barCode}</p>
  //               </div>
  //             </>
  //           )
  //         )}
  //       </div>
  //     </div>
  //   );
}

export default App;
