import Html5QrcodePlugin from './Html5QrcodePlugin.jsx';

function App() {
  const onNewScanResult = (decodedText, decodedResult) => {
    // handle decoded results here
    alert(`Decoded Text: ${decodedText}`);
    console.log(decodedResult);
  };

  return (
    <div>
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
    </div>
  );
}

export default App;
