"use client"

import { useEffect, useState } from "react";


export default function Home() {

  const [scSet, setSc] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  
  useEffect(() => {
    setHydrated(true)
  }, [])

  if(!hydrated) {
      return null
  }

  function setUpSc() {
    fetch("/api/getSc/?grade=1&cls=7", { method: "GET" })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
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

  if(!scSet)
  {
    setUpSc()
    setSc(true)
  }

  function onClikJoin() {
    window.location.href = '/DDD/welcome'
  }

  return (
    <div className="background">
      <div className="welcomeSection">
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
                    <a href="#" className="drop btn">자유 게시판</a>
                    <a href="#" className="drop btn">자료 게시판</a>
                    <a href="#" className="drop btn">공지 게시판</a>
                    <a href="#" className="drop btn">ㅁㄹ 게시판</a>
                  </div>
                </div>
              </div>
              <div className="navMenu btn">제작자</div>
            </div>
            <div className="navLine"></div>
          </div>
          <div className="loginBtn btn">
            <div className="join1">로그인</div>
          </div>
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
                <div className="boardTop">자유 게시판</div>
                <div className="boardLine"></div>
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
            <div className="boardTop">자유 게시판</div>

            <div className="boardLine"></div>
          </div>
          <div className="blank"></div>
          <div className="board2">
            <div className="boardTop secBTop">오늘의 급식</div>
            <div className="boardLine secBLine"></div>
          </div>
        </div>
        <div className="bg2"></div>
      </div>
      <div className="thirdSection">
        <div className="scTitle">
          <div>SCHDULE</div>
          <div className="scT2">1학년 7반 (9.18 ~ 9.22) 시간표</div>
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
              <div className="I">회장선거</div>
              <div className="D">5/23</div>
            </div>
            <div className="infoCxt M">
              <div className="I TM">중간고사</div>
              <div className="D TM">10/16</div>
            </div>
            <div className="infoCxt">
              <div className="I">기말고사</div>
              <div className="D">12/03</div>
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
