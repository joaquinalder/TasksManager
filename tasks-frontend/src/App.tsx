import Navbar from './components/navbar';
import './App.css';
import NavigationContainer from './containers/NavigationContainer';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <NavigationContainer/>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}


export default App;