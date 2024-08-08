import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { isMobile } from 'react-device-detect';
import useBarCodeStore from './store';

const Scanner2 = () => {
  const setBarCode = useBarCodeStore((state) => state.setBarCode);

  Html5Qrcode.getCameras() // Trigger user permissions
    .then((devices) => {
      if (devices && devices.length) {
        const html5QrCode = new Html5Qrcode('reader');

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
          { formatsToSupport: [Html5QrcodeSupportedFormats.CODE_39] },
          config,
          qrCodeSuccessCallback
        );
      }
    })
    .catch((err) => {
      console.error(err);
    });

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

export default Scanner2;
