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

  useEffect(() => {
    //! reset states
    setFormData({
      email: "",
      password: "",
    });
    setPassVisibility(false);
  }, [formType]);

  useEffect(() => {
    if (res?.status === "SUCCESS") router.push("/account/dashbord");
  }, [res]);
  return (
    <form className="form" onChange={(ev) => ChangeHandler(ev, setFormData)} onSubmit={(ev) => submitHandler(ev)}>
      <h3>{formType == "SignUp" ? "Create Account" : "Login To Account"}</h3>
      <input value={formData.email} name="email" placeholder="Email" type="email" />
      <div className="visibility">
        <input value={formData.password} name="password" placeholder="Password" type={passVisibility ? "text" : "password"}></input>
        <button type="button" onClick={() => setPassVisibility((prevS) => !prevS)}>
          {passVisibility ? <AiFillEye /> : <AiFillEyeInvisible />}
        </button>
      </div>
      <a href="#">Need Help ? </a>
      <button className="submit-btn">
        {formType == "SignUp" ? "Signup" : "Login"} {<FaLongArrowAltRight />}
      </button>
    </form>
  );
}

export default Form;
