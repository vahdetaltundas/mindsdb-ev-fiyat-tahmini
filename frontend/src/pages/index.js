import HomeComponent from "@/components/HomeComponent";
import { parse } from 'cookie';
import { useEffect, useState } from "react";


export default function Home() {
  const [signInChech,setSignInChech]=useState();
  const tokenCheck=async()=>{
    const authTokenCookie = parse(document.cookie).authToken;
    const hasVerifiedToken = authTokenCookie==null ?false:true;
    console.log(hasVerifiedToken ,authTokenCookie);
    setSignInChech(hasVerifiedToken)
  }
  useEffect(()=>{
    tokenCheck();
  },[setSignInChech])
  return (
    <>
    <HomeComponent signInChech={signInChech}/>
    </>
  )
}
