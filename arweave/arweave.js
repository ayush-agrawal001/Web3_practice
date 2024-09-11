import * as fs from "fs"
import * as sec_guy from "./sec.json"

const data = await fs.promises.readFile('./logo.png'); //nodejs specific

const response = await fetch('https://api.akord.com/files', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Api-Key': sec_guy.API_KEY,
        'Content-Type': 'image/png'
    },
    body: data
})

console.log(response)