import { getAuth, signOut } from 'firebase/auth';
import './App.scss';
import AuthProvider from './registration/Auth';
import { app } from './database/firebase';

function App() {
  const auth = getAuth(app);

  const handleLogout = () => {
    
    signOut(auth)

        .catch(error => console.error("Logout error:", error));
};
  
  return (
    <>
    <AuthProvider>
      <div>
        <p>dqs</p>
        <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
      </div>
    </AuthProvider>

    </>
  );
}

export default App;
