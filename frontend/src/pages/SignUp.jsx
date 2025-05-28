import React from "react";
import "../css/SignUp.css";
import SignUpBox from "../components/SignUpBox";
import { api } from '../config/api';

export default function SignUp() {
  return (
    <div className="screen">
      <SignUpBox
        onSignUp={async (firstName, lastName, email, password) => {
          try {
            const data = await api.signup({ firstName, lastName, email, password });
            alert(data.mes);
          } catch (err) {
            alert(err.message);
          }
        }}
      />
    </div>
  );
}