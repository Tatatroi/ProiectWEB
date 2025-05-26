import React from "react";
import "../css/SignUp.css";
import SignUpBox from "../components/SignupBox";

export default function SignUp() {
  return (
    <div className="screen">
      <SignUpBox
        onSignUp={async (firstName, lastName, email, password) => {
            
            try {

            const resp = await fetch('http://localhost:4000/api/users ', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password }),
                
            });

            const data = await resp.json();
            if (!resp.ok) throw new Error(data.mes || "Server error");
            alert(data.mes); // mesaj de succes
            } catch (err) {
            alert(err.message); // mesaj de eroare
            }
        }}
        />
    </div>
  );
}