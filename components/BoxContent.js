//? import icons
import { useState } from "react";
import { FaGoogle, FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa";
import Form from "./Form";

function BoxContent() {
  const [formType, setFormType] = useState("SignUp");
  return (
    <div className="box-content">
      <div className="form-buttons">
        <button type="button" onClick={() => setFormType("signIn")} className={formType == "signIn" ? "active" : ""}>
          Login
        </button>
        <button type="button" onClick={() => setFormType("SignUp")} className={formType == "signIn" ? "" : "active"}>
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

export default BoxContent;
