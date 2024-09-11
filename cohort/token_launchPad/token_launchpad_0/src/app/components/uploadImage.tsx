"use client"

import {Card, CardContent} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import uploadImage from "../lib/arweave_upload_img" 
import {useDropzone} from "react-dropzone"
import { useState } from "react"

export default function UploadImagePop(){

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

    const handleUpload = async () => {
        if (formDataImg)
            {
                const res = await uploadImage(formDataImg)
                console.log("response", res)
            }
    }


    return(
        <>
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
        <button className="w-2/5 self-center items-center rounded-md shadow-lg hover:bg-gray-100" onClick={handleUpload}>Upload</button>
        </>
        
        
    )
}
