import Html5QrcodePlugin from './Html5QrcodePlugin.jsx';

function App() {
  const onNewScanResult = (decodedText, decodedResult) => {
    alert(`Decoded Text: ${decodedText}`);
    console.log(decodedResult);
  };

  let qrboxFunction = function (viewfinderWidth, viewfinderHeight) {
    let minEdgePercentage = 0.7;
    let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
    let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
    return {
      width: qrboxSize,
      height: qrboxSize,
    };
  };

  return (
    <div>
      <Html5QrcodePlugin
        fps={10}
        // qrbox={{ width: 350, height: 100 }}
        qrbox={qrboxFunction}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
    </div>
  );
}

export default App;
