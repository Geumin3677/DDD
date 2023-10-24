"use client"

import { useEffect, useState } from "react";
import './page.css'
import { useSession } from "next-auth/react";


export default function Home() {

  const [scSet, setSc] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true)
  }, [])

  if(!hydrated) {
      return null
  }

  function onClikBack() {
    window.location.href = '/'
  }


  const observe = (element) => {
    if (!element) {
        return;
    }

    observer.observe(element);
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const { target, isIntersecting } = entry;

            if (isIntersecting) {
                target.classList.add("item--show");
                return;
            }

            target.classList.remove("item--show");
        });
    })

  return (
    <>
        <div className="background">
            <div className="Section1">
                <div className="nav">
                    <div className="navMenuCxt">
                    <div className="navMenu btn">정책</div>
                    <div className="navMenu navDrop">
                        <div style={{position:"relative", zIndex:11}}>게시판</div>
                        <div style={{zIndex:9, marginBottom:'400px'}}>
                        <div className="navDropCxt">
                            <a href="board/main" className="drop btn">게시판 메인</a>
                            <a href="board/noice" className="drop btn">공지 게시판</a>
                            <a href="board/study" className="drop btn">공부 게시판</a>
                            <a href="board/free" className="drop btn">잡담 게시판</a>
                        </div>
                        </div>
                    </div>
                    <div className="navMenu btn">제작자</div>
                    </div>
                    <div className="navLine"></div>
                </div>
                <img src="./images/bg4.png" className="bg11"></img>
                <img src="./images/bg2.png" className="bg12"></img>
                <img src="./images/bg3.png" className="bg13"></img>
                <div className="welcomeTitle">
                    <span style={{fontFamily:"S-CoreDream-Medium"}}>이매 커뮤니티</span>
                    에<br />오신것을 
                    <span style={{fontFamily:"S-CoreDream-Medium"}}>환영합니다</span>
                </div>
            </div>
            <div className="Section2">
                <img ref={observe} src="./images/bg5.png" className="bg14"></img>
                <img ref={observe} src="./images/bg6.png" className="bg15"></img>
                <img ref={observe} src="./images/bg7.png" className="bg16"></img>
                <div className="rtnCxt">
                    <div className="rtnBtn btn"  onClick={onClikBack.bind(this)}>
                        <div className="rect1">▶</div>
                        <div className="join1">메인페이지로<br />돌아가기</div>
                        <div className="rect1">◀︎</div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
