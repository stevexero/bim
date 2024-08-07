import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Html5QrcodeScanner } from 'html5-qrcode';

const qrcodeRegionId = 'html5qr-code-full-region';

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props) => {
  let config = {};
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

const Html5QrcodePlugin = (props) => {
  useEffect(() => {
    // when component mounts
    const config = createConfig(props);
    const verbose = props.verbose === true;
    // Success callback is required.
    if (!props.qrCodeSuccessCallback) {
      throw new Error('qrCodeSuccessCallback is a required callback.');
    }
    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose
    );
    html5QrcodeScanner.render(
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback
    );

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error('Failed to clear html5QrcodeScanner. ', error);
      });
    };
  }, [props]);

  return <div id={qrcodeRegionId} />;
};

Html5QrcodePlugin.propTypes = {
  fps: PropTypes.number,
  qrbox: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
  ]),
  aspectRatio: PropTypes.number,
  disableFlip: PropTypes.bool,
  verbose: PropTypes.bool,
  qrCodeSuccessCallback: PropTypes.func.isRequired,
  qrCodeErrorCallback: PropTypes.func,
};

export default Html5QrcodePlugin;
