// Ascii
// 1 character = 7 bits
// Every byte corresponds to a text on the computer.

//////Converting asciicode to asciiText ///////////

const bytesToasciiText = (bytes) => {
    return new TextDecoder().decode(bytes)
}

const uint8 = new Uint8Array( [65, 121, 117, 115, 104] );
const text = bytesToasciiText(uint8)
console.log(text);

////// Converting asciitext to asciicode /////////

const asciiToBytes = (asciiText) => {
    return new Uint8Array([...asciiText].map(char => char.charCodeAt(0) ))
}

const ascii = "Ayush";
const bytesArr = asciiToBytes(ascii)
console.log(bytesArr);
