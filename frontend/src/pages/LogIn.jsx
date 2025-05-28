import "../css/SignUp.css";
import LogInBox from "../components/LogInBox";
import { useNavigate } from 'react-router-dom'; // Pentru redirectare

export default function LogIn({ setUser, setLoggedIn }) {
  const navigate = useNavigate();

  const handleLogIn = async (email, password) => {
    try {
      const resp = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password})
      });

      if (!resp.ok) {
        const errorData = await resp.json();
        throw new Error(errorData.mes || "Eroare la autentificare");
      }

      const data = await resp.json();

      const fullUser = {
        ...data.user,
        isAuthenticated: true
      };


      localStorage.setItem('user', JSON.stringify(fullUser));

      console.log("Aici e userul meuuuuuuuuuuu", fullUser)


      // 👇 Actualizezi state-ul din App.jsx
      setUser(fullUser);
      setLoggedIn(true);

      navigate('/mytrips');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <LogInBox onLogIn={handleLogIn} />
  );
}
