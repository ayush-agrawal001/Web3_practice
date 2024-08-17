import React, { useState } from "react";
import {generateMnemonic, mnemonicToSeedSync} from "bip39"
import {derivePath} from "ed25519-hd-key"
// import { HDKey } from 'micro-ed25519-hdkey';
import { Keypair } from "@solana/web3.js"
import bs58 from "bs58"

function App(){
  const [showThis, setShowThis] = useState(null)
  const [pubKey, setPubKey] = useState(null)
  const [pvtKey, setPvtKey] = useState(null)

  const handleClickMn = () => {
    const mnemonic = generateMnemonic()
    setShowThis(mnemonic)
  }

  const createWallet = () => {
    const masterSeed = mnemonicToSeedSync(showThis)
    const derivedSeed = derivePath("m/44'/501'/0'/0'", masterSeed.toString("hex")).key
    const myKeyPair = Keypair.fromSeed(derivedSeed)
    console.log(myKeyPair);
    setPubKey(myKeyPair.publicKey.toString())
    setPvtKey(bs58.encode(myKeyPair.secretKey)) // this is only the pvt key
  }

  return (
  <div> 
    <button onClick={handleClickMn}>Click Me</button>
    <h1>{showThis}</h1>
    <button onClick={createWallet}>createWallet</button>
    <h3>Your Pub Key {pubKey}</h3>
    <h3>Your PVT Key {pvtKey}</h3>
  </div>
  )
}

export default App;