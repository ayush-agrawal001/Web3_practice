import React, { useState } from "react"
import createToken from "../lib/createToken"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import {RingLoader} from "react-spinners"
import metadataJson from "../lib/arweave_upload_metadata"
import { FaStar } from "react-icons/fa";

export const TokenForm = () => {
    
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [decimals, setDecimals] = useState(9);
    const [supply, setSupply] = useState(1);
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [pubKey, setPubKey] = useState("");
    const [loading, setLoading] = useState(false)
    const { connection } = useConnection()
    const wallet = useWallet()
    
    const mintingToken = async() => {
        setLoading(true)
        const res = await metadataJson(name, symbol, description, imageUrl)
        const metUrl = res.cloud.url
        console.log(res.cloud.url)
        const mintPubKey = createToken(wallet, connection, name, symbol, metUrl, decimals, supply)
        setPubKey(mintPubKey)
        setTimeout(() => {setLoading(false)}, 3000)
        console.log("mintingToken")
    }

    return (
        <>
        {!loading ?    
            
            <form className="shadow-lg p-8 rounded-lg flex flex-col gap-5 justify-center items-center h-auto w-auto mt-24 ">
                <div className="flex gap-3">
                    <LableAndInput title = "Name" inputType = "text" setFun = {setName} inputValue = {name} maxLen={25} />
                    <LableAndInput title = "Symbol" inputType = "text" setFun = {setSymbol} inputValue = {symbol} maxLen={5}/>
                </div>
                <div className="flex gap-3">
                    <LableAndInput title = "Decimal" min={0} inputType = "number" setFun = {setDecimals} inputValue = {decimals} className="h-8" />
                    <LableAndInput title = "Supply" min={0} inputType = "number" setFun = {setSupply} inputValue = {supply} className="h-8"/>
                </div>
                {/* <div className="flex gap-3">
                </div> */}
                        <LableAndInput title = "Description" inputType = "text" setFun = {setDescription} inputValue = {description} className="h-20 w-full"/>
                        <LableAndInput title = "Image URL" inputType = "text" setFun = {setImageUrl} inputValue = {imageUrl} className="h-8 w-full"/>
                <div className="flex gap-3">
    
                </div>
                {(wallet?.publicKey && name !== "" && symbol !== "") ?
                    <>
                    <div className="flex flex-col items-center group h-0 ">
                        {
                            imageUrl === "" && <span className="relative bottom-10 scale-0 text-pretty text-xl font-serif bg-gray-50 p-2 
                                        rounded-md shadow-md z-50
                                        group-hover:scale-100 
                                        origin-center transition-all 
                                        ease-in-out duration-200 h-24">Please ensure to upload your Image URL!</span>
                        }
                        <button type="button" className="fixed bottom-72 font-serif text-xl
                        shadow-md rounded-3xl p-3 
                        hover:rounded-lg transition-all hover:bg-gray-100 hover:shadow-xl duration-200
                        " onClick={mintingToken}>
                            Create Token
                        </button>
                    </div>
                    {pubKey ? <div>
                        <div className="text-pretty w-52 text-xl font-serif font-medium ">Token mint public key is</div>
                        <div > {pubKey}</div>
                    </div> : ""}
                    </>
                     : ""}
            </form>
            
            : <div className="absolute top-1/2 left-1/2"><RingLoader size={100}/></div> }
        </>
    )
}

interface propsType {
    title : string,
    inputType : string,
    setFun : (arg0 : string | number) => void
    inputValue : string | number,
    maxLen? : number,
    max? : number,
    min? : number,
    className? : string,
}

const LableAndInput : React.FC<propsType> = ({title, inputType, setFun, 
    inputValue, maxLen, max, min,
    className}) => {
    
        const className0 =`border-2 shadow-sm  focus:outline-none focus:shadow-lg w-48 h-8 ${className}` 
        return (
        <>
        <div className="flex flex-col m-3 w-full"> 
            <div className="flex">
                {(inputValue === "") ? <div className="text-red-700 origin-left transition-all ease-in-out"><FaStar size={8}/></div> : <div></div>}
                <label className="text-2xl font-medium font-serif">{title}</label>
            </div>
            <input type={inputType}
                    maxLength={maxLen} 
                    max={max} min={min} 
                    onChange={(e) => {setFun(e.target.value)}}
                    value={inputValue}
                    className={className0}
                    />
        </div>  
        </>
    )
}