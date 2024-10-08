import "dotenv/config"

import * as sec_guy from "./sec.json" 

export default async function metadataJson(name : string, symbol : string, description : string, imageUrl : string){

    const data = {
        name : name,
        symbol : symbol,
        description : description,
        image : imageUrl
    }
    
    const response = await fetch('https://api.akord.com/files', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Api-Key': process.env.NEXT_PUBLIC_API_KEY,
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify(data)
    })
    
    const result = response.json()
    console.log(result)
    return result
}







