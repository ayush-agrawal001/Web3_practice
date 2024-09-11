import React, { useState } from "react";
import {generateMnemonic, mnemonicToSeedSync} from "bip39"
import {derivePath} from "ed25519-hd-key"
// import { HDKey } from 'micro-ed25519-hdkey';
import { Keypair } from "@solana/web3.js"
import bs58 from "bs58"
import { keccak256 } from "@ethersproject/keccak256"


function App(){
  const [showThis, setShowThis] = useState(null)
  const [SOLpubKey, setSOLPubKey] = useState(null)
  const [SOLpvtKey, setSOLPvtKey] = useState(null)
  const [ETHpubKey, setETHPubKey] = useState(null)
  const [ETHpvtKey, setETHPvtKey] = useState(null)

  const handleClickMn = () => {
    const mnemonic = generateMnemonic()
    setShowThis(mnemonic)
  }

  const createSOLwallet = () => {
    const masterSeed = mnemonicToSeedSync(showThis)
    const derivedSeed = derivePath("m/44'/501'/0'/0'", masterSeed.toString("hex")).key
    const myKeyPair = Keypair.fromSeed(derivedSeed)
    console.log(myKeyPair);
    setSOLPubKey(myKeyPair.publicKey.toBase58())
    setSOLPvtKey(bs58.encode(myKeyPair.secretKey)) // this is only the pvt key
  }

  const createETHwallet = () => {
    const masterSeed = mnemonicToSeedSync(showThis)
    const derivedSeed = derivePath("m/44'/60'/0'/0'", masterSeed.toString("hex")).key
    const myKeyPair = Keypair.fromSeed(derivedSeed)
    const pubKey = myKeyPair.publicKey.toBuffer()
    setETHPubKey(keccak256(pubKey)) // doesnot require substring(24) or removing last 20 bytes(pack. feature) 
    setETHPvtKey(keccak256(myKeyPair.secretKey))
  }

  return (
  <div> 
    <button onClick={handleClickMn}>Click Me</button>
    <h1>{showThis}</h1>
    <button onClick={createSOLwallet}>createSOLwallet</button>
    <button onClick={createETHwallet}>createETHwallet</button>
    <h3>Your SOL Pub Key {SOLpubKey}</h3>
    <h3>Your SOL PVT Key {SOLpvtKey}</h3>
    <h3>Your ETH Pub Key {ETHpubKey}</h3>
    <h3>Your ETH PVT Key {ETHpvtKey}</h3>
  </div>
  )
}

export default App;