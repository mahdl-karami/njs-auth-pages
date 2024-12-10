import AnimationBox from "@/components/AnimationsBox";
import { verify } from "jsonwebtoken";
import React from "react";

function dashbord() {
  return (
    <>
      <AnimationBox />
      <div className="box-content">
        <h3>Welcome.</h3>
      </div>
    </>
  );
}

export default dashbord;

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
