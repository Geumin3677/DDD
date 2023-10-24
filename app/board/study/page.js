"use client"

import { useEffect, useState } from "react";
import './page.css'
import '../board.css'
import { signIn, signOut, useSession } from 'next-auth/react';



export default function Home() {
  const [hydrated, setHydrated] = useState(false);
  const [postCnt, setCnt] = useState(-1)
  const [posts, setPost] = useState([])
  const [load, setLoad] = useState(false)
  const [notice, setNotice] = useState({})

  const { data: session } = useSession()
  
  useEffect(() => {
    setHydrated(true)
  }, [])

  function onClickMake() {
    window.location.href = "/board/write"
  }

  function onClickLogin() {
    window.location.href = '/Login'
  }

  if(!hydrated) {
      return null
  }

  if(postCnt == -1)
  {
    setUp()
    setCnt(1)
  }
  async function setUp() {
    await fetch('/api/board/prevRead/?type=study&start=0&cnt=10')
        .then((res) => res.json())
        .then(async (res) => {
            await res.data.forEach(element => {
                setPost(prevList => [...prevList, element])
            })
            setCnt(res.lastPos)
        })
        await fetch('/api/board/prevRead/?type=notice&start=0&cnt=1')
        .then((res) => res.json())
        .then(async (res) => {
            setNotice(res.data[0])
        })
  }

  async function onMore() {
    setLoad(true)
    await fetch(`/api/board/prevRead/?type=study&start=${postCnt}&cnt=10`)
        .then((res) => res.json())
        .then(async (res) => {
            await res.data.forEach(element => {
                setPost(prevList => [...prevList, element])
            })
            setCnt(res.lastPos)
            setLoad(false)
        })
  }

  function getTime(t) {
    const date = new Date(t)
    var late = new Date().getTime() - date.getTime()
    late = Math.floor(late/1000)
    if(late < 60) {
        return `${late}초 전`
    }
    else if(late < 60 * 60) {
        return `${Math.floor(late/60)}분 전`
    }
    else if(late < 60*60*24) {
        return `${Math.floor((late / 60)/60)}시간 전`
    }
    else {
        return `${date.getMonth() + 1}.${date.getDate()}`
    }
  }

   return (
    <div style={{position:'relative'}}>
            <div style={{zIndex:99, position:"relative"}}>
                <div className="topBar"></div>
            </div>
            <div className="nav">
                <div className="navMenuCxt">
                <div className="navMenu btn">정책</div>
                <div className="navMenu navDrop">
                    <div style={{position:"relative", zIndex:11}}>게시판</div>
                    <div style={{zIndex:9, marginBottom:'400px'}}>
                        <div className="navDropCxt">
                            <a onClick={() => {window.location = '/board/main'}} className="drop btn">게시판 메인</a>
                            <a onClick={() => {window.location = '/board/notice'}} className="drop btn">공지 게시판</a>
                            <a onClick={() => {window.location = '/board/study'}} className="drop btn">공부 게시판</a>
                            <a onClick={() => {window.location = '/board/free'}} className="drop btn">잡담 게시판</a>
                        </div>
                    </div>
                </div>
                <div className="navMenu btn">제작자</div>
                </div>
                <div className="navLine"></div>
            </div>
            {
                (session !== null) ? (
                <div className="userInfoCxt">
                    <div className="userName">{session.user.name}</div>
                    <img className="userProfileImg" src={session.user.image} />
                    <div onClick={() => signOut()} className="userDrop btn">로그아웃</div>
                </div>
                ) : (
                <div className="loginBtn btn" onClick={onClickLogin.bind(this)}>
                    <div className="join1">로그인</div>
                </div>
                )
            }
            <div className="boardMainCxt">
                <div className="noticeCxt">
                    <div className="noticeIcon">공지</div>
                    <div className="noticeTxt" onClick={() => {window.location.href = `/board/read/${notice?.id}`}}>{notice?.title}</div>
                </div>
                <div className="boardPop">
                    <div className="boardttop">
                        <h2>공부 게시판</h2>
                        {   
                            (session !== null) ? (
                            <div className="makeBtn btn" onClick={onClickMake.bind(this)}>
                                <div className="join1">게시물 올리기</div>
                            </div>
                            ) : (
                                <></>
                            )
                        }
                    </div>
                    <div className="board11">
                        {
                            posts.map((element) => {    
                                return (<div className="postPrevCxt" onClick={() => {window.location.href=`/board/read/${element.id}`}}>
                                    <div className="txtCxt">
                                        <div className="TitleCxt">
                                            <div className="boardType">공부</div>
                                            <div className="boardTxt">{element.title}</div>
                                            {
                                                (element.img) ? (
                                                    <svg className="boardPic" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                        <rect x="1.5" y="1.5" width="27" height="27" rx="4.5" fill="white" stroke="#929DFF" stroke-width="3"/>
                                                        <rect x="5.32227" y="15" width="19.3548" height="9.67742" rx="4.83871" fill="#929DFF"/>
                                                        <circle cx="7.49969" cy="8.4677" r="2.17742" fill="#929DFF"/>
                                                    </svg>
                                                ) : (
                                                    <></>
                                                )
                                            }
                                        </div>
                                        <div className="detailTxt">{element.author} - {getTime(element.time)} | 👍{element.like} 💬{element.comment}</div>
                                    </div>
                                </div>)
                            })
                        }
                    </div>
                    {/* <div className="pagenationCxt">
                        <div className="pagenationBtn btn">◀︎</div>
                        <div className="pagenationNumber btn active">1</div>
                        <div className="pagenationNumber btn">2</div>
                        <div className="pagenationNumber btn">3</div>
                        <div className="pagenationNumber btn">4</div>
                        <div className="pagenationNumber btn">5</div>
                        <div className="pagenationBtn btn">▶</div>
                    </div> */}

                    {
                        (load) ? (
                            <div className="moreBtn">로딩중...</div>
                        ) : (                     
                            <div className="moreBtn btn" onClick={onMore.bind()}>더보기</div>
                        )
                    }
                </div>
                <div className="footer">© 2023 IMAE_DDD_Project. All Rights Reserved.<br></br>Made by ABELA With dddTeam</div>
            </div>
        </div>
   )
}