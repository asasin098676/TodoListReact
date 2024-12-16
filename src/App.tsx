import { getAuth, signOut } from 'firebase/auth';
import './App.scss';
import AuthProvider from './registration/Auth';
import { app } from './database/firebase';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const auth = getAuth(app);


  return (
    <>
      <BrowserRouter>
        <AuthProvider />
      </BrowserRouter>
    </>
  );
}

export default App;
