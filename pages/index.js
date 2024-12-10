import AnimationBox from "@/components/AnimationsBox";
import ContentsBox from "@/components/ContentsBox";
import React from "react";

function index() {
  return (
    <>
      <AnimationBox />
      <ContentsBox />
    </>
  );
}

export default index;

export async function getServerSideProps({ req }) {
  const { token } = req.cookies;
  if (token) {
    return {
      redirect: {
        destination: "/dashbord",
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
