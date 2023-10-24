"use client"

import { useEffect, useState } from "react";
import './page.css'
import { signIn, signOut, useSession } from 'next-auth/react';



export default function Home() {
  const [hydrated, setHydrated] = useState(false);
  const [id,setId] = useState("")
  const [pw, setPw] = useState("")

  const { data: session } = useSession()
  
  useEffect(() => {
    setHydrated(true)
  }, [])

  if(!hydrated) {
      return null
  }

  if(session?.user !== undefined) {
    if(session.user.email.endsWith('@imae.hs.kr')) {
        alert('로그인 성공')
        window.location.href = "/"
    } else if(session.user.email == 'imaecommunity@gmail.com') {
        alert('관리자 계정 로그인 성공')
        window.location.href = "/"
    }
    else {
        alert('이매고 계정이 아닙니다.')
        signOut()
    }
  }
  return (
    <>
        <div className="background">
            <div className="LoginSection">
                <div style={{zIndex:99, position:"relative"}}>
                    <div className="topBar"></div>
                </div>
                <img src="./images/bg8.png" className="bg22" />
                <img src="./images/bg9.png" className="bg21" />
                <div className="LoginCxt">
                    <div className="LoginModal">
                        <div className="loginTxt">로그인</div>
                        <button onClick={() => signIn("google")} className="loginInput google btn"><img src="./images/googleLogo.png" className="bg31" /><div className="googleTxt">Google로 로그인하기</div></button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}