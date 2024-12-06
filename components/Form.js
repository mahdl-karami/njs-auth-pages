import ChangeHandler from "@/helpers/ChangeHandler";
import { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
function Form({ formType }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passVisibility, setPassVisibility] = useState(false);
  useEffect(() => {
    setFormData({
      email: "",
      password: "",
    });
    setPassVisibility(false);
  }, [formType]);
  return (
    <form className="form" onChange={(ev) => ChangeHandler(ev, setFormData)}>
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
