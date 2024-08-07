import { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import PropTypes from 'prop-types';

const BarcodeScanner = ({ onScan }) => {
  const [scanning, setScanning] = useState(false);

  const handleScan = (result) => {
    if (result && result.length > 0) {
      onScan(result[0].rawValue);
      setScanning(false);
    }
  };

  const startScan = () => {
    setScanning(true);
  };

  const stopScan = () => {
    setScanning(false);
  };

  return (
    <div>
      <button onClick={scanning ? stopScan : startScan}>
        {scanning ? 'Stop' : 'Scan'}
      </button>
      {scanning && <Scanner onScan={handleScan} />}
    </div>
  );
};

BarcodeScanner.propTypes = {
  onScan: PropTypes.func.isRequired,
};

export default BarcodeScanner;
