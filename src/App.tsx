import './App.css'
import Footer from './components/footer';
import CryptoPrice from './components/landingPage';

function App() {


  return (
    <>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <CryptoPrice />
      </div>
      <Footer />
    </>
  )
}

export default App;