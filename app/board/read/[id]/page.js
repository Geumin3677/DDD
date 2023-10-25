"use client"

import { useEffect, useState } from "react";
import './page.css'
import './ckeditor.css'
import { signIn, signOut, useSession } from 'next-auth/react';
import { useParams } from "next/navigation";
import axios from "axios";

export default function Home() {
  const params = useParams()
  const [post, setPost] = useState()
  const [like, setLike] = useState(false)
  const [posting, setPosting] = useState(false)
  const [reply, setReply] = useState(null)

  const { data: session } = useSession()

  if(post == null) {
    fetch(`/api/board/read/${params.id}`)
      .then((res) => res.json())
      .then(async (res) => {
        setPost(res.data)
      })
  }

  if(post?.like.includes(session?.user.name) && !(like)) {
    setLike(true)
  }

  async function onDelete() {
    await fetch(`/api/board/delete/?id=${post.id}`)
        .then((res) => res.json())
        .then(async (res) => {
            if(res.message == 'ok')
            {
                alert('삭제 성공')
                history.back()
            }
        })
  }

  async function onLike() {
    if(session == null) {
      alert('로그인후 이용해주세요')
      return
    }
    if(like) {
      post.like.shift()
      fetch(`/api/board/like?name=${session.user.name}&id=${post.id}`)
      history.go(0)
    } else {
      post.like.push(session.user.name)
      fetch(`/api/board/like?name=${session.user.name}&id=${post.id}`)
      history.go(0)
    }
  }

  async function onComment() {
    if(reply != null && document.querySelector('.cinput').value.indexOf(reply) != 0) {
      setReply(null)
    }
    if(document.querySelector('.cinput').value != "")
    {
      setPosting(true)
      try {
          const postRes = await axios.post('/api/board/addComment', {
            type: (reply == null) ? (true) : (false),
            index: (reply == null) ? (null) : (reply),
            cxt: {
                user: {
                  img: session.user.image,
                  name: session.user.name
                },
                data: document.querySelector('.cinput').value,
                time: new Date((new Date()).getTime() + (1000 * 60 * 60 * 9)),
                cocomment: []
            },
            id: post.id
        })
        if(postRes.status === 200) {
          history.go(0);
          setPosting(false)
          setReply(null)
        } else {
          alert(`댓글 달기 실패 (errorCode : ${postRes.status}})`)
          setPosting(false)
          setReply(null)
        }
      } catch(error) {
        console.log(error)
          if(error.response?.status === 413) {
            alert('파일 용량 초과')
            setPosting(false)
            setReply(null)
          }
          else {
            alert('댓글 달기 실패')
            setPosting(false)
            setReply(null)
          }
      }
    }
  }


  function onReply(index, name) {
    document.querySelector('.cinput').value = `@${name} `
    setReply(index)
  }

  function onReReply(index, name) {
    document.querySelector('.cinput').value = `@${name} `
    setReply(index)
  }

  return (
    <>
      {
        (post == null) ? (
            <div>로딩중...</div>
          ) : (
            <div style={{position:'relative'}}>
              <div style={{zIndex:99, position:"relative"}}>
                  <div className="topBar"><img style={{height: '60%', width: 'auto'}} src="/images/logo.png" onClick={() => {window.location.href = '/'}} /></div>
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
              <div className="postCxt">
                {
                  (post.visible) ? (
                    <>
                    <div className="title">{post.cxt.title}</div>
                      <div className="t2">
                        <div className="line" style={{width:'auto', height:'1px', backgroundColor:'#7063FF'}}></div>
                        <div style={{display:'flex', marginTop:"10px", alignItems:"flex-end"}}>
                          <div className="author">{post.authorInfo.author}</div>
                          <div style={{margin:'0px 10px 0px 10px'}}>l</div>
                          <div className="time">{post.authorInfo.time.split('.')[0].replace('T', ' ')}</div>
                          {
                            (post.authorInfo.author == session?.user.name || session?.user.email == 'imaecommunity@gmail.com') ? (
                              <button className="deleteBtn btn" onClick={onDelete.bind()}>삭제</button>
                            ) : (
                              <></>
                            )
                          }
                        </div>
                      </div>
                      <div className="board11 cxt" dangerouslySetInnerHTML={{__html: post.cxt.data}}>
                      </div>
                      <div className="likeCxt">
                        {
                          (like) ? (
                            <img onClick={onLike.bind()} className="likeBtn btn" src="/images/likeIcona.png" />
                          ) : (
                            <img onClick={onLike.bind()} className="likeBtn btn" src="/images/likeIconb.png" />
                          )
                        }
                        <div className="likeTxt">{post.like.length}개</div>
                      </div>
                      <div className="commentCxt">
                        <div className="board11">
                          {
                            post.comments.map((element, index) => {
                              return (
                                <>
                                <div className="comment" id={index}>
                                  <img className="profile" src={element.user.img}></img>
                                  <div className="aa">
                                    <div className="bb">
                                      <div className="name" onClick={() => {onReply(index, element.user.name)}}>{element.user.name}</div>
                                      <div className="timee">l {element.time.split('.')[0].replace('T', ' l ')}</div>
                                    </div>
                                    <div style={{fontSize:'2vw'}}>{element.data}</div>
                                  </div>
                                </div>
                                {
                                  element.cocomment.map((element, index) => {
                                    return(
                                      <div className="cocomment" key={index}>
                                        <img className="profile" src={element.user.img}></img>
                                        <div className="aa">
                                          <div className="bb">
                                            <div className="name" onClick={() => {onReReply(index, element.user.name)}}>{element.user.name}</div>
                                            <div className="timee">l {element.time.split('.')[0].replace('T', ' l ')}</div>
                                          </div>
                                          <div style={{fontSize:'2vw'}}>{element.data}</div>
                                        </div>
                                      </div>
                                    )
                                  })
                                }
                                </>
                              )
                            })
                          }
                          
                          <div style={{height:'1px', backgroundColor:'#929DFF', width:'100%', marginTop:'20px'}}></div>
                          <div className="commentWriter">
                            <input className="cinput"></input>
                            {
                              (posting) ? (
                                <div className="csend">
                                  <svg className="sendIcon" width="36" height="33" viewBox="0 0 36 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M35.1522 15.7826L0.000182822 0L0 15.7826H35.1522ZM35.1522 17.9348L0.000182822 33L0 17.9348H35.1522Z" fill="white"/>
                                  </svg>
                                </div>
                              ) : (
                                <div className="csend btn" onClick={onComment.bind()}>
                                  <svg className="sendIcon" width="36" height="33" viewBox="0 0 36 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M35.1522 15.7826L0.000182822 0L0 15.7826H35.1522ZM35.1522 17.9348L0.000182822 33L0 17.9348H35.1522Z" fill="white"/>
                                  </svg>
                                </div>
                              )
                            }
                          </div>
                        </div>
                      </div>
                      <div className="writeBtns">
                        <div className="sendBtn btn" onClick={() => {history.back()}} style={{backgroundColor:"#a9a9a9"}}> 나가기
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                    <div className="title">삭제된 게시물 입니다</div>
                    <div className="writeBtns" style={{marginLeft:'0'}}>
                      <div className="sendBtn btn" onClick={() => {history.back()}} style={{backgroundColor:"#a9a9a9"}}> 나가기
                      </div>
                    </div>
                    </>
                  )
                }
                
              </div>
                <div className="footer">© 2023 IMAE_DDD_Project. All Rights Reserved.<br></br>Made by ABELA With dddTeam</div>
            </div>
        )
      }
    </>
  )
}