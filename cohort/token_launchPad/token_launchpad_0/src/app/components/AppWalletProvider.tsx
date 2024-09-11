"use client"

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { TokenForm } from "./TokenForm";
import { WalletConnectButton, WalletDisconnectButton, WalletModalButton, WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import React, { Children, useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";

export default function AppWalletProvider(
  {children} : { children : React.ReactNode }
) {
  
  const endpoint = useMemo( () => clusterApiUrl("devnet"), ["devnet"])
  const wallets = useMemo(() => [], [])

  return (
  <>
      
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </>
  );
}
