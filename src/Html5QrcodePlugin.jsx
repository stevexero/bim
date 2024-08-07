import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';

const qrcodeRegionId = 'html5qr-code-full-region';

const createConfig = ({ fps, qrbox, disableFlip, aspectRatio }) => {
  let config = {};
  if (fps) {
    config.fps = fps;
  }
  if (qrbox) {
    config.qrbox = qrbox;
  }
  if (aspectRatio) {
    config.aspectRatio = aspectRatio;
  }
  if (disableFlip !== undefined) {
    config.disableFlip = disableFlip;
  }
  return config;
};

const Html5QrcodePlugin = (props) => {
  useEffect(() => {
    const config = createConfig(props);
    const verbose = props.verbose === true;

    if (!props.qrCodeSuccessCallback) {
      throw new Error('qrCodeSuccessCallback is a required callback.');
    }

    const html5QrcodeScanner = new Html5QrcodeScanner(
      'html5qr-code-full-region',
      { formatsToSupport: [Html5QrcodeSupportedFormats.CODE_39] },
      config,
      verbose
    );
    html5QrcodeScanner.render(
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback
    );

    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error('Failed to clear html5QrcodeScanner. ', error);
      });
    };
  }, [props]);

  return <div id={qrcodeRegionId} className='html5-qrcode-container' />;
};

Html5QrcodePlugin.propTypes = {
  verbose: PropTypes.bool,
  qrCodeSuccessCallback: PropTypes.func.isRequired,
  qrCodeErrorCallback: PropTypes.func,
};

export default Html5QrcodePlugin;
