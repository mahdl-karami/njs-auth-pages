//? import libs
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";
//? import icons
import { FaGoogle, FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa";
//? import components
import AnimationBox from "@/components/AnimationsBox";
//? import hooks
import { useRouter } from "next/router";

function Dashbord({ email }) {
  const router = useRouter();

  function logOutHandler() {
    fetch("/api/auth/signout")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        router.push("/");
      });
  }

  return (
    <>
      <AnimationBox />
      <div className="box-content">
        <h3 className="form-buttons">Welcome.</h3>
        <div className="dashbord">
          <div>
            <p>Email : </p>
            <h3>{email}</h3>
          </div>
          <button className="submit-btn" onClick={() => logOutHandler()}>
            Logout
          </button>
        </div>
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
    </>
  );
}

export default Dashbord;

export async function getServerSideProps({ req }) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const res = verify(token, process.env.JWT_SECRET_KEY);
    return {
      props: {
        email: res?.email,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
