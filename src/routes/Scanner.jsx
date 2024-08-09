import { useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { isMobile } from 'react-device-detect';
import useBarCodeStore from '../store';

const Scanner = () => {
  const barCode = useBarCodeStore((state) => state.barCode);
  const setBarCode = useBarCodeStore((state) => state.setBarCode);
  const qrCodeInstanceRef = useRef(null);

  const [isRunning, setIsRunning] = useState(false);

  let qrboxFunction = function (viewfinderWidth, viewfinderHeight) {
    let minEdgePercentage = 0.7;
    let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
    let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
    return {
      width: qrboxSize,
      height: qrboxSize,
    };
  };

  const config = {
    fps: 10,
    qrbox: qrboxFunction(),
    formatsToSupport: [Html5QrcodeSupportedFormats.CODE_39],
  };

  !isRunning &&
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          const html5QrCode = new Html5Qrcode('reader');
          qrCodeInstanceRef.current = html5QrCode;
        }
      })
      .catch((err) => {
        console.error(err);
      });

  const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    console.log(decodedResult);
    setBarCode(decodedText);
    setIsRunning(false);
    stopScan();
  };

  const startScan = () => {
    if (qrCodeInstanceRef.current) {
      qrCodeInstanceRef.current
        .start({ facingMode: 'environment' }, config, qrCodeSuccessCallback)
        .then(() => console.log('QR Code scanning is started.'))
        .catch((err) => {
          console.error('Failed to stop scanning', err);
        });
    }
  };

  const stopScan = () => {
    if (qrCodeInstanceRef.current) {
      qrCodeInstanceRef.current
        .stop()
        .then(() => {
          console.log('QR Code scanning is stopped.');
          qrCodeInstanceRef.current.clear();
        })
        .catch((err) => {
          console.error('Failed to stop scanning', err);
        });
    }
  };

  const handleClick = () => {
    if (isRunning) {
      setIsRunning(false);
      stopScan();
    } else {
      setIsRunning(true);
      startScan();
    }
  };

  return (
    <div>
      {!isMobile ? (
        <h1>Scanner optimized for mobile only</h1>
      ) : (
        <>
          <div
            id='reader'
            className='border border-error rounded-2xl h-[200px]'
          ></div>
          <button
            className='btn btn-lg btn-block rounded-xl btn-error text-white mt-4'
            onClick={handleClick}
          >
            {isRunning ? 'Stop Camera' : 'Start Camera'}
          </button>
          <p className='mt-4'>Code: {barCode}</p>
        </>
      )}
    </div>
  );
};

export default Scanner;
