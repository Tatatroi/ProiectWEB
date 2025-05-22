import "../css/SignUp.css";
import LogInBox from "../components/LogInBox";

export default function LogIn() {
  return (
    <div className="screen">
      <LogInBox onLogIn={async (email, password) => {
        // Optional: Replace this with your API call
        alert("Sign in with: " + email);
      }} />
    </div>
  );
}
