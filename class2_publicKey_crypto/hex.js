// Hex
// 1 character = 4 bits
// A single hex character can be any of the 16 possible values: 0-9 and A-F.

const arraytoHax = (bArr) => {
    return [...bArr].map(char => char.toString(16)).join("")
}

const binarryArray = new Uint8Array([72, 101, 108, 108, 111]);
console.log(arraytoHax(binarryArray));

