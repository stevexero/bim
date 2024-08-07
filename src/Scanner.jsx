import { useState } from 'react';
import Html5QrcodePlugin from './Html5QrcodePlugin.jsx';
import useBarCodeStore from './store';

const Scanner = () => {
  const setBarCode = useBarCodeStore((state) => state.setBarCode);
  const [scanning, setScanning] = useState(false);

  //   const onNewScanResult = (decodedText, decodedResult) => {
  const onNewScanResult = (decodedText) => {
    setBarCode(decodedText);
    // console.log(`Decoded Text: ${decodedText}`, decodedResult);
    setScanning(false);
  };

  const handleScan = () => {
    setScanning(true);
  };

  let qrboxFunction = function (viewfinderWidth, viewfinderHeight) {
    let minEdgePercentage = 0.2;
    let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
    let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
    return {
      width: qrboxSize,
      height: qrboxSize,
    };
  };

  return (
    <div>
      {!scanning ? (
        <button onClick={handleScan} className='btn btn-primary text-white'>
          Scan Barcode
        </button>
      ) : (
        <Html5QrcodePlugin
          fps={10}
          qrbox={qrboxFunction}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
        />
      )}
    </div>
  );
};

export default Scanner;
