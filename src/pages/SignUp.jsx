import React from "react";
import "../css/SignUp.css";
import SignUpBox from "../components/SignupBox";

export default function SignUp() {
  return (
    <div className="screen">
      <SignUpBox onSignUp={async (email, password) => {
        // Optional: Replace this with your API call
        alert("Signup with: " + email);
      }} />
    </div>
  );
}