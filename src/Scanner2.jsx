// import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { useEffect, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { isMobile } from 'react-device-detect';
import useBarCodeStore from './store';
import PropTypes from 'prop-types';

const Scanner2 = ({ qrCodeRef }) => {
  const setBarCode = useBarCodeStore((state) => state.setBarCode);
  const setScannerRunning = useBarCodeStore((state) => state.setScannerRunning);
  const qrCodeInstanceRef = useRef(null);

  useEffect(() => {
    if (isMobile) {
      Html5Qrcode.getCameras()
        .then((devices) => {
          if (devices && devices.length) {
            const html5QrCode = new Html5Qrcode('reader');
            qrCodeInstanceRef.current = html5QrCode; //
            if (qrCodeRef) {
              //
              qrCodeRef.current = html5QrCode; //
            } //

            const qrCodeSuccessCallback = (decodedText, decodedResult) => {
              console.log(decodedResult);
              setBarCode(decodedText);
              html5QrCode
                .stop()
                .then(() => {
                  console.log('Scanning Complete');
                  setScannerRunning(false);
                })
                .catch((err) => {
                  console.log(err);
                });
            };

            const config = {
              fps: 10,
              qrbox: { width: 250, height: 250 },
              formatsToSupport: [Html5QrcodeSupportedFormats.CODE_39],
            };

            html5QrCode
              .start(
                { facingMode: 'environment' },
                // { formatsToSupport: [Html5QrcodeSupportedFormats.CODE_39] },
                config,
                qrCodeSuccessCallback
              )
              .then(() => {
                setScannerRunning(true);
              });
          }
        })
        .catch((err) => {
          console.error(err);
        });

      return () => {
        if (qrCodeInstanceRef.current) {
          qrCodeInstanceRef.current
            .stop()
            .then(() => {
              qrCodeInstanceRef.current.clear();
              setScannerRunning(false);
            })
            .catch((err) => console.error('Failed to stop scanning', err));
        }
      };
    }
  }, [setBarCode, setScannerRunning, qrCodeRef]);

  const stopScan = () => {
    if (qrCodeInstanceRef.current) {
      qrCodeInstanceRef.current
        .stop()
        .then(() => {
          console.log('QR Code scanning is stopped.');
          qrCodeInstanceRef.current.clear();
          setScannerRunning(false);
        })
        .catch((err) => {
          console.error('Failed to stop scanning', err);
        });
    }
  };

  return (
    <>
      {!isMobile ? (
        <h1>Scanner optimized for mobile only</h1>
      ) : (
        <>
          <div id='reader' width='600px'></div>
          <button onClick={stopScan}>Stop Camera</button>
        </>
      )}
    </>
  );
};

Scanner2.propTypes = {
  qrCodeRef: PropTypes.shape({
    current: PropTypes.instanceOf(Object),
  }).isRequired,
};

export default Scanner2;
