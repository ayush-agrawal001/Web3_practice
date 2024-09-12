"use client"

import {Card, CardContent} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import uploadImage from "../lib/arweave_upload_img" 
import {useDropzone} from "react-dropzone"
import { useState } from "react"
import PropagateLoader from "react-spinners/PropagateLoader"
import Lottie from "lottie-react" 
import animationData from "../../assets/animationImage.json"
import {CopyBlock} from "react-code-blocks"

export default function UploadImagePop(){

    const [formDataImg, setFormDataImg] = useState(new FormData());
    const [gatewayUrl, setGatewayUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [isUrls, setIsUrls] = useState(false)
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        maxFiles : 1,
        maxSize : 524288,
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

    const handleUpload = async () => {
        if (formDataImg)
            {
                setLoading(true)
                const res = await uploadImage(formDataImg)
                const imageUrl = res.success
                setGatewayUrl(imageUrl[0])
                console.log(gatewayUrl)
                setIsUrls(true)
                setTimeout(() =>{ setLoading(false)}, 3000)
            }
    }


    return(
        <>
            {loading ? <div className="absolute top-1/2 left-1/2"><PropagateLoader /></div> :
            <>
                {isUrls ? <div className="text-wrap w-5/12 overflow-x-auto">
                <CopyBlock
                text={String(gatewayUrl)}
                language="txt"
                wrapLongLines = {true}
                />
                
                </div> : 
                <>
                    {formDataImg.get("image") ? <div>
                        <Lottie size={2} animationData={animationData}/>
                        <button className="relative w-2/5 left-1/3 items-center rounded-3xl shadow-lg border-2
                    hover:bg-gray-100 hover:rounded-md transition-all ease-in-out duration-200 "
                    onClick={handleUpload}>Upload</button>
                        </div> : <><Card 
                    className={cn(
                        "bg-white border-2 border-slate-50",
                        "hover:cursor-pointer hover:animate-pulse hover:bg-slate-50 w-full",
                        "hover:border-slate-100 hover:border-1"
                        ,`${isDragActive ? "animate-wiggle" : ""}`
                    )}
                    {...getRootProps()}
                    >
                    <CardContent className="">
                        <input {...getInputProps()} type="text"/>
                        <div className="flex flex-col items-center justify-center gap-4 h-60 font-serif">
                            <p className="text-slate-500 text-muted-foreground text-4xl">{isDragActive ? "Drop your image here" : "Click or Drag"}</p>
                            <p className="text-muted-foreground text-md">Please upload less then 0.5 Mb (.png) Image</p> 
                        </div>
                    </CardContent>
                    </Card>       
                    </>
                    
                    }
                </>
                }
            </>
            }
        </>
    )
}
