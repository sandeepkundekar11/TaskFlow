import { useState } from "react"

const UseLogin=()=>{
    const [LoginInfo,setLoginInfo]=useState({
        name:"",
        password:""
    })

    const InputHandle=(e)=>{
        const {name,value}=e.target
        setLoginInfo({
            ...LoginInfo,
            [name]:value
        })
    }


    const OnFormHandle=()=>{
        
    }
}