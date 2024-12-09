//? import hooks
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
//? import helpers
import ChangeHandler from "@/helpers/ChangeHandler";
//? import icons
import { FaLongArrowAltRight } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Form({ formType }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passVisibility, setPassVisibility] = useState(false);
  const [res, setRes] = useState(null);
  const [error, setError] = useState({});

  function submitHandler(ev) {
    ev.preventDefault();
    const apiRoute = `/api/auth/${formType == "SignUp" ? "signup" : "login"}`;
    fetch(apiRoute, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => setRes(json));
  }

  //! reset states
  useEffect(() => {
    setFormData({
      email: "",
      password: "",
    });
    setPassVisibility(false);
    setRes(null);
    setError({});
  }, [formType]);
  //! reset invalid data errors
  useEffect(() => {
    if (error?.invalidData) setError({ invalidPassword: true });
    else setError((prevS) => ({ ...prevS, ["invalidEmail"]: false }));
  }, [formData.email]);
  useEffect(() => {
    if (error?.invalidData) setError({ invalidPassword: true });
    else setError((prevS) => ({ ...prevS, ["invalidPassword"]: false }));
  }, [formData.password]);
  //! check response (success or error)
  useEffect(() => {
    if (res?.error) setError({ [res?.error]: true });
    if (res?.status == "SUCCESS") setError({});
  }, [res]);

  return (
    <form className="form" onChange={(ev) => ChangeHandler(ev, setFormData)} onSubmit={(ev) => submitHandler(ev)}>
      <h3>{formType == "SignUp" ? "Create Account" : "Login To Account"}</h3>
      <div className="inputBox">
        <input className={error.invalidData || error.userExist || error.userNotExist || error.invalidEmail ? "errorBox" : ""} value={formData.email} name="email" placeholder="Email" type="email" />
        {error.invalidData || error.userExist || error.userNotExist || error.invalidEmail ? <p className="error">{res?.message}</p> : null}
      </div>
      <div className="visibility inputBox">
        <input className={error.incorrectPassword || error.invalidData || error.invalidPassword ? "errorBox" : ""} value={formData.password} name="password" placeholder="Password" type={passVisibility ? "text" : "password"}></input>
        <button type="button" onClick={() => setPassVisibility((prevS) => !prevS)}>
          {passVisibility ? <AiFillEye /> : <AiFillEyeInvisible />}
        </button>
        {error.incorrectPassword || error.invalidData || error.invalidPassword ? <p className="error">{res.message}</p> : null}
      </div>
      <a href="#">Need Help ? </a>
      <button className="submit-btn">
        {formType == "SignUp" ? "Signup" : "Login"} {<FaLongArrowAltRight />}
      </button>
    </form>
  );
}

export default Form;
