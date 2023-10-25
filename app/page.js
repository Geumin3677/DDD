"use client"

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import './board/board.css'


export default function Home() {

  const [scSet, setSc] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [auth, setAuth] = useState(false)
  const [postCnt, setCnt] = useState(-1)
  const [posts, setPost] = useState([])
  const [load, setLoad] = useState(false)
  const [meal, setMeal] = useState()

  const { data: session } = useSession()
  
  if(session !== null && !(auth)){
    setAuth(true)
    console.log(session)
  }
  
  useEffect(() => {
    setHydrated(true)
  }, [])

  if(!hydrated) {
      return null
  }

  function setUpSc() {
    if(session?.user.name == 'Admin' || session == null) {
      return
    }
    fetch(`api/getSc/?grade=${session?.user.name[0]}&cls=${(session?.user.name[1] == 0) ? (session?.user.name[2]) : (10)}`, { method: "GET" })
        .then((res) => res.json())
        .then((res) => {
            res = res.result
  
            var table = document.getElementById('table')
            var tr = document.createElement('tr')
            var th = document.createElement('th')
            th.innerHTML = ''
            tr.appendChild(th)
            var th1 = document.createElement('th')
            th1.innerHTML = '월'
            tr.appendChild(th1)
            var th2 = document.createElement('th')
            th2.innerHTML = '화'
            tr.appendChild(th2)
            var th3 = document.createElement('th')
            th3.innerHTML = '수'
            tr.appendChild(th3)
            var th4 = document.createElement('th')
            th4.innerHTML = '목'
            tr.appendChild(th4)
            var th5 = document.createElement('th')
            th5.innerHTML = '금'
            tr.appendChild(th5)
            table.appendChild(tr)
  
            var x = 0
            while(x < 7)
            {
                var ttr = document.createElement('tr')
                var y = 0
                while(y < 6)
                {
                    var a
                    if(y === 0) {
                        a = `${x + 1}교시`
                    }
                    else
                    {
                        if(res[y - 1][x].subject === '')
                        {
                            a = "ㅤㅤㅤ"
                        }
                        else
                        {
                            a = `${res[y - 1][x].subject}`
                        }
                    }
                    var tmp = document.createElement('td')
                    tmp.innerHTML = a
                    ttr.appendChild(tmp)
                    y++
                }
                table.appendChild(ttr)
                x++
            }
        })
  }

  function setUp() {
    setInterval(diffDay, 1000);
  }

  function diffDay() {
    const remainTime = document.querySelector('.dday')

      const masTime = new Date("2023-12-14");
      const todayTime = new Date((new Date()).getTime() + (1000 * 60 * 60 * 9));
      
      const diff = masTime - todayTime;
      
      const diffDay = Math.floor(diff / (1000*60*60*24));
      
      remainTime.innerText = `${diffDay}`;

      if(session !== null) {

      }
  }
  async function setUpp() {
    await fetch('/api/board/prevRead/?type=all&start=0&cnt=5')
        .then((res) => res.json())
        .then(async (res) => {
            await res.data.forEach(element => {
                setPost(prevList => [...prevList, element])
            })
            setCnt(res.lastPos)
        })

    await fetch ('api/getMeal') .then((res) => res.json())
    .then(async (res) => {
        setMeal(res.result)
        console.log(res.result)
    })
  }

  if(postCnt == -1)
  {
    setUpp()
    setCnt(1)
  }

  function getTime(t) {
    const date = new Date(t)
    var late = new Date((new Date()).getTime() + (1000 * 60 * 60 * 9)).getTime() - date.getTime()
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

  if(!scSet)
  {
    setUpSc()
    setUp()
    setSc(true)
  }

  function onClikJoin() {
    window.location.href = '/welcome'
  }

  function onClickLogin() {
    window.location.href = '/Login'
  }

  return (
    <div className="background">
      <div className="welcomeSection">
          <div style={{zIndex:99, position:"relative"}}>
            <div className="topBar"><img style={{height: '60%', width: 'auto'}} src="./images/logo.png" onClick={() => {window.location.href = '/'}} /></div>
          </div>
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
          {
            (auth) ? (
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
          <div className="welcomeCxt">
            <div className="txtbox">
              <div className="textbox1 show">
                <div className="title t1">자유로운</div>
                <div className="title t2">이매소통방</div>
              </div>
            </div>
            <div className="imgbox">
              <div className="bgC1">
                <img className="chatS1 chat show" src="./images/chat1.png" />
                <img className="chatS2 chat show" src="./images/chat2.png" />
                <img className="bg1 show" src="./images/bg1.png" />
              </div>
              
            </div>
          </div>
          <div className="mobAd">
              <div className="board1">
                <div className="boardTop">오늘의 급식</div>
                <div className="boardLine"></div>
                <textarea className="meal" value={meal} readOnly/> 
              </div>
          </div>
          <div className="joinBtn btn"  onClick={onClikJoin.bind(this)}>
            <div className="rect1">▶</div>
            <div className="join1">참여하기</div>
            <div className="rect1">◀︎</div>
          </div>
      </div>
      <div className="secondSection">
        <div className="cardCxt1">
          <div className="board1">
            <div className="boardTop">신규 게시글</div>
            <div className="boardLine" style={{marginBottom:'10px'}}></div>
            {
                posts.map((element, index) => {    
                    return (<div className="postPrevCxt" onClick={() => {window.location.href=`/board/read/${element.id}`}} key={index}>
                        <div className="txtCxt">
                            <div className="TitleCxt">
                                <div className="boardType">잡담</div>
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
          <div className="blank"></div>
          <div className="board2">
            <div className="boardTop secBTop">오늘의 급식</div>
            <div className="boardLine secBLine"></div>
            <textarea className="meal" value={meal} readOnly/> 
          </div>
        </div>
        <div className="bg2"></div>
      </div>
      <div className="thirdSection">
        <div className="scTitle">
          <div>SCHDULE</div>
          <div className="scT2">{session?.user.name[0]}학년 {(session?.user.name[1] == 0) ? (session?.user.name[2]) : (10)}반 시간표</div>
        </div>
        <div className="scCxt">
          <div className="scBoard">
            <table class="table" id="table">
            </table>
          </div>
        </div>
      </div>
      <div className="schduleSection">
        <div className="bg3"></div>
        <div className="timerSec">
          <div className="timerBg">
            <div className="timerBg2">
              <div className="timerInfoCxt">
                <div className="dday">24</div>
                <div className="ddayt">D-DAY</div>
              </div>
            </div>
          </div>
        </div>
        <div className="txtSec">
          <div className="scInfoCxt">
            <div className="infoCxt">
              <div className="I">중간고사</div>
              <div className="D">10/16</div>
            </div>
            <div className="infoCxt M">
              <div className="I TM">기말고사</div>
              <div className="D TM">12/14</div>
            </div>
            <div className="infoCxt">
              <div className="I">종업식</div>
              <div className="D">12/29</div>
            </div>
          </div>
        </div>
        <div className="moreInfoBtn btn">범위 살펴보기 →</div>
      </div>
      <div className="lastSection">
        © 2023 IMAE_DDD_Project. All Rights Reserved.<br></br>Made by ABELA With dddTeam
      </div>
    </div>
  )
}
