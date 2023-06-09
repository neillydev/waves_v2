import { useContext, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import ContainerBlock from "@/components/ContainerBlock/ContainerBlock";

import { AuthContext, AuthProvider } from "@/context/AuthContext";
import Main from "@/components/Main/Main";
import LoginModal from "@/components/LoginModal/LoginModal";
import { ModalProvider } from "@/context/ModalContext";

const Home = () => {
  return (
    <>
      <Main />
      <LoginModal />
    </>
  );
};

export default Home;
