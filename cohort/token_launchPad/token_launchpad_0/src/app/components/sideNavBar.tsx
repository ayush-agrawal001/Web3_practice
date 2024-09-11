"use client"

import React, { ReactNode, useState } from "react";
import { FaCoins } from "react-icons/fa";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { RiExchange2Fill } from "react-icons/ri";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import UploadImagePop from "./uploadImage";
import { cn } from "@/lib/utils";



export default function SideNavBar(){

    const [formDataImg, setFormDataImg] = useState(new FormData());

    return (
        <div className="fixed top-0 left-0 h-screen w-20 m-0 bg-white flex flex-col justify-center shadow-lg">

            <SideBarIcons icon = {<FaCoins size={30} />} tooltip="Create Token"/>
            
            <Dialog>
                <DialogTrigger>
                    <SideBarIcons icon = {<RiUploadCloud2Fill size={30}/>} tooltip="Upload to arweave"/>
                </DialogTrigger>
                <DialogContent className={cn("h-3/5 w-4/5 text-3xl flex ")}>
                    <DialogHeader className={cn("text-3xl ")}>
                    <DialogTitle>Upload your Image in arweave permanent storage</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently upload your image.
                    </DialogDescription>
                    <UploadImagePop />
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <SideBarIcons icon = {<RiExchange2Fill size={30} />} tooltip="Liquidity pool"/>
        </div>

    )
}

interface propsType {
    icon : ReactNode,
    tooltip? : string
}

const SideBarIcons : React.FC<propsType>= ({icon, tooltip = "tooltip"}) => {
    return(
    <div className="flex gap ">
    <div className="text-slate-900 mx-auto my-32 bg-slate-200 p-3
         rounded-3xl hover:cursor-pointer hover:rounded-xl transition-all duration-200 ease-linear group">
        { icon }
        <span className="absolute mx-16 -my-9 text-2xl bg-slate-200 p-1 px-4 rounded-xl text-black font-medium 
                transition-all duration-100 scale-0 ease-in-out origin-left group-hover:scale-100 text-nowrap">
            {tooltip}
        </span>
    </div>
    </div>
    )
}