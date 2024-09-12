
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
import React, { ReactNode } from "react";

interface popUpProps{
    buttonTrigger : ReactNode,
    styleOfContent? : any,
    styleOfHeader? : any,
    title : string,
    description : string,
    extraTags : ReactNode
}

export const PopUp : React.FC<popUpProps> = ({buttonTrigger, styleOfContent, styleOfHeader, title, description, extraTags}) => {
    return(
        <>
            <Dialog>
                <DialogTrigger>
                    {buttonTrigger}
                </DialogTrigger>
                <DialogContent className={styleOfContent}>
                    <DialogHeader className={styleOfHeader}>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                    {extraTags}
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}
