// Base58
// It is similar to Base64 but uses a different set of characters to avoid visually similar characters and 
// to make the encoded output more user-friendly

// Base58 uses 58 different characters:
// Uppercase letters: A-Z (excluding I and O)
// Lowercase letters: a-z (excluding l)
// Numbers: 1-9 (excluding 0)

import bs58 from "bs58"

const binaryArray = new Uint8Array([72, 101, 108, 108, 111]);

console.log(bs58.encode(binaryArray));

console.log(bs58.decode("9Ajdvzr"));