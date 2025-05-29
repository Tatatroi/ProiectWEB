import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpBox({ onSignUp }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function validate() {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.lastName.trim()) errs.lastName = "Last name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email address";
    if (form.password.length < 6) errs.password = "At least 6 characters";
    if (form.password !== form.confirm) errs.confirm = "Passwords do not match";
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
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirm: true,
    });

    if (Object.keys(errs).length === 0) {
      setSubmitting(true);
      try {
        await onSignUp(
          form.firstName,
          form.lastName,
          form.email,
          form.password
        );

        setForm({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirm: "",
        });
        setTouched({});
        setErrors({});
        setSuccessMessage(
          "Account created successfully! Redirecting to login..."
        );

        setTimeout(() => {
          setSuccessMessage("");
          navigate("/login");
        }, 3000);
      } catch (err) {
        alert("Something went wrong while signing up.");
      }
      setSubmitting(false);
    }
  }

  return (
    <div className="box-signup">
      <div className="title-signup">Sign up</div>

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ width: "104%" }}>
        <input
          name="firstName"
          className={`text-box${
            errors.firstName && touched.firstName ? " input-error" : ""
          }`}
          type="text"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.firstName && touched.firstName && (
          <div className="error-message">{errors.firstName}</div>
        )}

        <input
          name="lastName"
          className={`text-box${
            errors.lastName && touched.lastName ? " input-error" : ""
          }`}
          type="text"
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
          className={`text-box${
            errors.email && touched.email ? " input-error" : ""
          }`}
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
          className={`text-box${
            errors.password && touched.password ? " input-error" : ""
          }`}
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
          className={`text-box${
            errors.confirm && touched.confirm ? " input-error" : ""
          }`}
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
        <Link to="/login">Already have an account? Log in</Link>
      </div>
    </div>
  );
}
