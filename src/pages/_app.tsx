import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { ModalProvider } from "@/context/ModalContext";
import { PostProvider } from "@/context/PostContext";
import ContainerBlock from "@/components/ContainerBlock/ContainerBlock";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ModalProvider>
        <PostProvider>
          <ContainerBlock>
            <Component {...pageProps} />
          </ContainerBlock>
        </PostProvider>
      </ModalProvider>
    </AuthProvider>
  );
}
