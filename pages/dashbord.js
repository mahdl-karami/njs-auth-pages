import AnimationBox from "@/components/AnimationsBox";
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
  return {
    props: {
      data: "",
    },
  };
}
