import crypto from "crypto";

var nonce = 0;
var prefix = "00000"

while (true){
    const hash = crypto.createHash("sha256").update('100xdevs' + String(nonce)).digest("hex");
    if (hash.startsWith(prefix)){
        console.log('100xdevs ' + String(nonce))
        console.log(String(nonce))

        process.exit(0);
    }
    nonce += 1
}