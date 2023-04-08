import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { ModalProvider } from "@/context/ModalContext";
import { PostProvider } from "@/context/PostContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ModalProvider>
        <PostProvider>
          <Component {...pageProps} />
        </PostProvider>
      </ModalProvider>
    </AuthProvider>
  );
}
