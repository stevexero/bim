import Html5QrcodePlugin from './Html5QrcodePlugin.jsx';

function App() {
  const onNewScanResult = (decodedText, decodedResult) => {
    alert(`Decoded Text: ${decodedText}`);
    console.log(decodedResult);
  };

  return (
    <div>
      <Html5QrcodePlugin
        fps={10}
        qrbox={{ width: 350, height: 100 }}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
    </div>
  );
}

export default App;
