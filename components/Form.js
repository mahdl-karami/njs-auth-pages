import ChangeHandler from "@/helpers/ChangeHandler";
import { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

function Form({ formType }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    setFormData({
      email: "",
      password: "",
    });
  }, [formType]);
  return (
    <form className="form" onChange={(ev) => ChangeHandler(ev, setFormData)}>
      <h3>{formType == "SignUp" ? "Create Account" : "Login To Account"}</h3>
      <input value={formData.email} name="email" placeholder="Email" type="email" />
      <div>
        <input value={formData.password} name="password" placeholder="Password" type="password"></input>
      </div>
      <a href="#">Need Help ? </a>
      <button className="submit-btn">
        {formType == "SignUp" ? "Signup" : "Login"} {<FaLongArrowAltRight />}
      </button>
    </form>
  );
}

export default Form;
