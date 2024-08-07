import Html5QrcodePlugin from './Html5QrcodePlugin.jsx';

const onNewScanResult = (decodedText, decodedResult) => {
  alert(`Decoded Text: ${decodedText}`);
  console.log(decodedResult);
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

const Scanner = () => {
  return (
    <div>
      <Html5QrcodePlugin
        fps={10}
        qrbox={qrboxFunction}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
    </div>
  );
};

export default Scanner;
