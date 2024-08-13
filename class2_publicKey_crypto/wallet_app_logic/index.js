import { Keypair } from "@solana/web3.js"
import { generateMnemonic, mnemonicToSeedSync } from "bip39"
import { derivePath } from "ed25519-hd-key"

const Mnemonic = generateMnemonic();

const masterSeed = mnemonicToSeedSync(Mnemonic); //this is the first seed(top most) called master seed

//Derivation paths specify a systematic way to derive various keys from the master seed.
const derivedSeed = derivePath("m/44'/501'/0'/0'", masterSeed.toString("hex")).key;
// derivedSeed is the secretKey to get the public key and pvtKey


const myKeyPair = Keypair.fromSeed(derivedSeed) // generated keypair from the seed 32byte size

const myPubKey = myKeyPair.publicKey

console.log(`This is the nemonic for master seed :- ${Mnemonic}`);
console.log(`This is my public key ${myPubKey}`);