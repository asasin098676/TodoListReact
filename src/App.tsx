import './App.scss';
import AuthProvider from './registration/Auth';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider />
      </BrowserRouter>
    </>
  );
}

export default App;
