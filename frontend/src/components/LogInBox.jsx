import "../css/SignUp.css";
import { useState } from "react";

export default function LogIn({ onLogIn }) {
  // State
  const [form, setForm] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Validation
  function validate() {
    const errs = {};
    if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email address";
    if (form.password.length < 6) errs.password = "Min 6 characters required";
    return errs;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  }

  function handleBlur(e) {
    setTouched({ ...touched, [e.target.name]: true });
    setErrors(validate());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setTouched({ email: true, password: true });
    if (Object.keys(errs).length === 0 && onLogIn) {
      setSubmitting(true);
      await onLogIn(form.email, form.password);
      setSubmitting(false);
    }
  }

  return (
    <div className="screen">
      <div className="box-signup">
        <div className="title-signup">Log In</div>
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <input
            name="email"
            className={`text-box${errors.email && touched.email ? " input-error" : ""}`}
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="email"
          />
          {errors.email && touched.email && (
            <div className="error-message">{errors.email}</div>
          )}

          <input
            name="password"
            className={`text-box${errors.password && touched.password ? " input-error" : ""}`}
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="current-password"
          />
          {errors.password && touched.password && (
            <div className="error-message">{errors.password}</div>
          )}

          <button className="button-signup" type="submit" disabled={submitting}>
            {submitting ? "Loging In..." : "Log In"}
          </button>
        </form>
        <div className="buton-link mt-3">
          <a href="/signup">Don't have an account yet?</a>
        </div>
      </div>
    </div>
  );
}