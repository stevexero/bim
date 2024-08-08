// import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { isMobile } from 'react-device-detect';
import useBarCodeStore from './store';
import PropTypes from 'prop-types';

const Scanner2 = ({ qrCodeRef }) => {
  const setBarCode = useBarCodeStore((state) => state.setBarCode);
  const qrCodeInstanceRef = useRef(null);

  useEffect(() => {
    if (isMobile) {
      Html5Qrcode.getCameras()
        .then((devices) => {
          if (devices && devices.length) {
            const html5QrCode = new Html5Qrcode('reader');
            qrCodeInstanceRef.current = html5QrCode;
            if (qrCodeRef) {
              qrCodeRef.current = html5QrCode;
            }

            const qrCodeSuccessCallback = (decodedText, decodedResult) => {
              console.log(decodedResult);
              setBarCode(decodedText);
              html5QrCode
                .stop()
                .then(() => {
                  console.log('Scanning Complete');
                })
                .catch((err) => {
                  console.log(err);
                });
            };

            const config = { fps: 10, qrbox: { width: 250, height: 250 } };

            html5QrCode.start(
              { facingMode: 'environment' },
              // { formatsToSupport: [Html5QrcodeSupportedFormats.CODE_39] },
              config,
              qrCodeSuccessCallback
            );
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
            })
            .catch((err) => console.error('Failed to stop scanning', err));
        }
      };
    }
  }, [setBarCode, qrCodeRef]);

  return (
    <>
      {!isMobile ? (
        <h1>Scanner optimized for mobile only</h1>
      ) : (
        <div id='reader' width='600px'></div>
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
