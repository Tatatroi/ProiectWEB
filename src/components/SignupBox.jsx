import { useState } from 'react';

export default function SignUpBox({ onSignUp }) {
  const [form, setForm] = useState({ email: '', password: '', confirm: '' });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Simple validators
  function validate() {
    const errs = {};
    if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email address";
    if (form.password.length < 6) errs.password = "At least 6 characters";
    if (form.password !== form.confirm) errs.confirm = "Passwords do not match";
    return errs;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({...errors, [e.target.name]: undefined});
  }

  function handleBlur(e) {
    setTouched({ ...touched, [e.target.name]: true });
    setErrors(validate());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setTouched({ email: true, password: true, confirm: true });
    if (Object.keys(errs).length === 0) {
      setSubmitting(true);
      await onSignUp(form.email, form.password);
      setSubmitting(false);
    }
  }

  return (
    <div className="box-signup">
      <div className="title-signup">Sign up</div>
      <form onSubmit={handleSubmit} style={{width: '104%'}}>
        <input
          name="first-name"
          className={`text-box${errors.firstName && touched.firstName ? " input-error" : ""}`}
          type="first-name"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.firstName && touched.firstName && (
          <div className="error-message">{errors.firstName}</div>
        )}
        <input
          name="last-name"
          className={`text-box${errors.lastName && touched.lastName ? " input-error" : ""}`}
          type="last-name"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.lastName && touched.lastName && (
          <div className="error-message">{errors.lastName}</div>
        )}
        <input
          name="email"
          className={`text-box${errors.email && touched.email ? " input-error" : ""}`}
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email && (
          <div className="error-message">{errors.email}</div>
        )}

        <input
          name="password"
          className={`text-box${errors.password && touched.password ? " input-error" : ""}`}
          type="password"
          placeholder="Password (min 6 characters)"
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && touched.password && (
          <div className="error-message">{errors.password}</div>
        )}

        <input
          name="confirm"
          className={`text-box${errors.confirm && touched.confirm ? " input-error" : ""}`}
          type="password"
          placeholder="Confirm Password"
          autoComplete="new-password"
          value={form.confirm}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.confirm && touched.confirm && (
          <div className="error-message">{errors.confirm}</div>
        )}

        <button className="button-signup" type="submit" disabled={submitting}>
          {submitting ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
      <div className="buton-link mt-3">
        <a href="/login">Already have an account? Log in</a>
      </div>
    </div>
  );
}