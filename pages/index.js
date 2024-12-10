import AnimationBox from "@/components/AnimationsBox";
import ContentsBox from "@/components/ContentsBox";
import { verify } from "jsonwebtoken";
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
    try {
      verify(token, process.env.JWT_SECRET_KEY);
      return {
        redirect: {
          destination: "/dashbord",
          permanent: false,
        },
      };
    } catch (error) {
      return {
        props: {},
      };
    }
  }
  return {
    props: {},
  };
}
