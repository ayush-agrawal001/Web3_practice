import { useState } from "react"
import createToken from "../lib/createToken"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import uploadImage from "../lib/arweave_upload_img"
import {useDropzone} from "react-dropzone"
import {Card, CardContent} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import metadataJson from "../lib/arweave_upload_metadata"

export const TokenForm = () => {
    
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [decimals, setDecimals] = useState(9);
    const [supply, setSupply] = useState(1);
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [formDataImg, setFormDataImg] = useState(new FormData());

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        maxFiles : 1,
        accept : {
            "image/png" : [".png"],
        },
        onDrop : async (acceptFiles, fileRejections) => {
            if (acceptFiles.length) {
                const formData = new FormData();
                formData.append("image", acceptFiles[0]);
                const objectUrl = URL.createObjectURL(acceptFiles[0]);
                setFormDataImg(formData)
            }
        }
    })

    const { connection } = useConnection()
    const wallet = useWallet()
    
    const mintingToken = async() => {
        // if (formDataImg)
        //     {
        //     const res = await uploadImage(formDataImg)
        //     console.log("response", res)
        //     }
        metadataJson(name, symbol, description, imageUrl)
        // createToken(wallet, connection)
        console.log("mintingToken")
    }

    return (
        <form className="bg-slate-500 p-8 rounded-lg flex flex-col gap-5 justify-center items-center">
            <div className="flex gap-3">
                <div className="flex flex-col m-3">
                    <label>Name</label>
                    <input type="text" maxLength={25} onChange={(e) => {setName(e.target.value)}} value={name} className="border-2  border-solid border-black" />
                </div>
                <div className="flex flex-col m-3">
                <label>Symbol</label>
                <input type="text" maxLength={5} onChange={(e) => {setSymbol(e.target.value)}} value={symbol} className="border-2 border-solid border-black" />
                </div>
            </div>
            <div className="flex gap-3">
                <div className="flex flex-col m-3">
                    <label >Decimals</label>
                    <input type="number" min={0} onChange={(e) => {setDecimals(parseInt(e.target.value))}} value={decimals} className="border-2 border-solid border-black"/>
                </div>
                <div className="flex flex-col m-3">
                    <label>Supply</label>
                    <input type="number" min={0} onChange={(e) => {setSupply(parseInt(e.target.value))}} value={supply} className="border-2  border-solid border-black"/>
                </div>
            </div>
            <div className="flex gap-3">
                <div className="flex flex-col m-3">
                    <label>Description</label>
                    <input type="text" maxLength={1000} onChange={(e) => {setDescription(e.target.value)}} value={description} className="border-2  border-solid border-black"/>
                </div>
                <div className="flex flex-col m-3">
                    <label>Image URL</label>
                    <input type="text" onChange={(e) => {setImageUrl(e.target.value)}} value={imageUrl} className="border-2 border-solid border-black"></input>
                </div>
            </div>
            <div className="flex gap-3">
                    <Card 
                    className={cn(
                        "bg-white border-2 border-slate-50",
                        "hover:cursor-pointer hover:animate-pulse hover:bg-slate-50 w-full h-80 ",
                        "hover:border-slate-100 hover:border-1"
                        ,`${isDragActive ? "animate-wiggle" : ""}`
                    )}
                    {...getRootProps()}
                >
                    <CardContent className="">
                        <input {...getInputProps()} type="text"/>
                        <div className="flex flex-col items-center justify-center gap-4 h-60">
                            <p className="text-slate-500 text-muted-foreground text-4xl">{isDragActive ? "Drop your image here" : "Start by uploading the image"}</p>
                            <p className="text-muted-foreground text-xl">Supporting files are .png only</p> 
                        </div>
                    </CardContent>
                </Card>                
            </div>
            {wallet?.publicKey && <button type="button" className="border-2 border-black p-4" onClick={mintingToken}>Create Token</button>}
        </form>
    )
}