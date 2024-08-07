import { useRef, useState, useEffect } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import PropTypes from 'prop-types';

const BarcodeScanner = ({ onScan }) => {
  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [codeReader, setCodeReader] = useState(null);

  useEffect(() => {
    const newCodeReader = new BrowserMultiFormatReader();
    setCodeReader(newCodeReader);
    return () => {
      if (newCodeReader) {
        newCodeReader.reset();
      }
    };
  }, []);

  const startScan = async () => {
    if (!codeReader) return;

    setScanning(true);

    try {
      await codeReader.decodeFromVideoDevice(
        null,
        videoRef.current,
        (result, err) => {
          if (result) {
            onScan(result.text);
            stopScan();
          }
          if (err && !(err instanceof NotFoundException)) {
            console.error(err);
            stopScan();
          }
        }
      );
    } catch (error) {
      console.error('Error accessing camera:', error);
      stopScan();
    }
  };

  const stopScan = () => {
    setScanning(false);
    if (codeReader) {
      codeReader.reset();
    }
  };

  return (
    <div>
      <button onClick={scanning ? stopScan : startScan}>
        {scanning ? 'Stop' : 'Scan'}
      </button>
      {scanning && (
        <div>
          <video ref={videoRef} style={{ width: '100%' }} />
        </div>
      )}
    </div>
  );
};

BarcodeScanner.propTypes = {
  onScan: PropTypes.func.isRequired,
};

export default BarcodeScanner;
