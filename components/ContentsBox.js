//? import hooks
import { useState } from "react";
//? import icons
import { FaGoogle, FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa";
//? import components
import Form from "./Form";

function ContentsBox() {
  const [formType, setFormType] = useState("SignUp");
  return (
    <div className="box-content">
      <div className="form-buttons">
        <button type="button" onClick={() => setFormType("SignIn")} className={formType == "SignIn" ? "active" : ""}>
          Login
        </button>
        <button type="button" onClick={() => setFormType("SignUp")} className={formType == "SignIn" ? "" : "active"}>
          Signup
        </button>
      </div>
      <Form formType={formType} />
      <div className="social-media-icons">
        <span>
          <FaGoogle />
        </span>
        <span>
          <FaFacebookF />
        </span>
        <span>
          <FaTwitter />
        </span>
        <span>
          <FaGithub />
        </span>
      </div>
    </div>
  );
}

export default ContentsBox;