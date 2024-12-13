import { getAuth, signOut } from 'firebase/auth';
import './App.scss';
import AuthProvider from './registration/Auth';
import { app } from './database/firebase';

function App() {
  const auth = getAuth(app);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Не вдалося виконати вихід. Спробуйте ще раз.");
    }
  };

  return (
    <>
      <AuthProvider>
        <div>
          <p>Ви увійшли до системи</p>
          <button onClick={handleLogout} className="logout-btn">
            Вийти
          </button>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
