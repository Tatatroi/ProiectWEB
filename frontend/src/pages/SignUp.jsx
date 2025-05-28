import React from "react";
import "../css/SignUp.css";
import SignUpBox from "../components/SignUpBox";
import { API_URL } from '../config/api'; 

export default function SignUp() {
  return (
    <div className="screen">
      <SignUpBox
        onSignUp={async (firstName, lastName, email, password) => {
            try {
            const resp = await fetch(`${API_URL}/api/users`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ firstName, lastName, email, password }),
            });

            const data = await resp.json(); 
            if (!resp.ok) throw new Error(data.mes || "Server error");
          } catch (err) {
            alert(err.message);
          }
        }}
      />
    </div>
  );
}