import { Html5Qrcode } from 'html5-qrcode';
import useBarCodeStore from './store';

const Scanner2 = () => {
  const setBarCode = useBarCodeStore((state) => state.setBarCode);

  // This method will trigger user permissions
  Html5Qrcode.getCameras()
    .then((devices) => {
      /**
       * devices would be an array of objects of type:
       * { id: "id", label: "label" }
       */
      if (devices && devices.length) {
        // var cameraId = devices[0].id;
        const html5QrCode = new Html5Qrcode('reader');

        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
          console.log(decodedResult);
          setBarCode(decodedText);
          html5QrCode
            .stop()
            .then(() => {
              // QR Code scanning is stopped.
              console.log('Scanning Complete');
            })
            .catch((err) => {
              // Stop failed, handle it.
              console.log(err);
            });
        };

        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        html5QrCode.start(
          { facingMode: 'environment' },
          config,
          qrCodeSuccessCallback
        );

        // html5QrCode
        //   .start(
        //     cameraId,
        //     {
        //       fps: 10, // Optional, frame per seconds for qr code scanning
        //       qrbox: { width: 250, height: 250 }, // Optional, if you want bounded box UI
        //     },
        //     (decodedText, decodedResult) => {
        //       // do something when code is read
        //       console.log(decodedResult);
        //       setBarCode(decodedText);
        //     },
        //     (errorMessage) => {
        //       // parse error, ignore it.
        //       console.log(errorMessage);
        //     }
        //   )
        //   .catch((err) => {
        //     // Start failed, handle it.
        //     console.error(err);
        //   });
      }
    })
    .catch((err) => {
      console.error(err);
    });

  return <div id='reader' width='600px'></div>;
};

export default Scanner2;
