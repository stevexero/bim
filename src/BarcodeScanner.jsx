import { useState } from 'react';
import { Scanner as ScannerComp } from '@yudiel/react-qr-scanner';
import PropTypes from 'prop-types';

const BarcodeScanner = () => {
  const [pause, setPause] = useState(false);

  const handleScan = (detectedCodes) => {
    if (detectedCodes && detectedCodes.length > 0) {
      alert(detectedCodes[0].rawValue);
      setPause(true);
    }
  };

  return (
    <div style={{ width: '100%', margin: 'auto' }}>
      <button onClick={() => setPause((val) => !val)}>
        {pause ? 'Pause Off' : 'Pause On'}
      </button>
      <ScannerComp
        formats={['code_39']}
        onScan={handleScan}
        components={{
          audio: true,
          onOff: true,
          torch: true,
          zoom: true,
          finder: true,
        }}
        allowMultiple={false}
        scanDelay={2000}
        paused={pause}
      />
    </div>
  );
};

BarcodeScanner.propTypes = {
  onScan: PropTypes.func.isRequired,
};

export default BarcodeScanner;
