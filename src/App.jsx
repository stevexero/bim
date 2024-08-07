import BarcodeScanner from './BarcodeScanner.jsx';

function App() {
  const handleScan = (data) => {
    alert(`Scanned Code: ${data}`);
  };

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <BarcodeScanner onScan={handleScan} />
    </div>
  );
}

export default App;
