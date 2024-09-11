"use client"

import type { AppProps } from "next/app";
// import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
// import { TokenForm } from "./components/TokenForm";
import { WalletConnectButton, WalletDisconnectButton, WalletModalButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
// import { useMemo } from "react";
// import { clusterApiUrl } from "@solana/web3.js";
// import { Main } from "next/document";
// import CreateToken from "./components/createToken" 
import '@solana/wallet-adapter-react-ui/styles.css';
import { TokenForm } from "./components/TokenForm";

export default function Home(
  { Component, pageProps }: AppProps
) {
  return (
    <main >
      <div  className="border rounded flex justify-around">
              <WalletConnectButton></WalletConnectButton>
              <WalletModalButton></WalletModalButton>
              <WalletDisconnectButton></WalletDisconnectButton>
    </div>
    <TokenForm></TokenForm>
  </main>
  );
}
