import crypto from "crypto";

var input = 1
var prefix = "00000"

while (true){
    const hash = crypto.createHash("sha256").update(String(input)).digest("hex");
    if(hash.startsWith(prefix)){
        console.log(input)
        process.exit(0)
    }
    input += 1
}
