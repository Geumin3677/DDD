"use client"

import { useEffect, useState } from "react";
import './writepage.css'
import { signIn, signOut, useSession } from 'next-auth/react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Base64UploaderPlugin from "@/@ckeditor/Base64Upload";
import axios from "axios";

export default function Home() {
    const [hydrated, setHydrated] = useState(false);
    const [data, setData] = useState()
    const [posting, setPosting] = useState(false)

    const { data: session } = useSession()
    
    useEffect(() => {
        setHydrated(true)
    }, [])

    if(!hydrated) {
        return null
    }

    function onBack() {
        history.back()
    }

    async function onSent() {
        if(session == null) {
            alert("로그인 후 이용해 주세요")
            history.back()
        }
        if(data.length != "0" && document.querySelector('#title').value.length != "0") {
            setPosting(true)
            try {
                const postRes = await axios.post('/api/board/write', {
                    boardType: document.querySelector('.boardSelect').value,
                    img: data.includes('<img'),
                    cxt: {
                        title: document.querySelector('#title').value,
                        data: data
                    },
                    authorInfo:{
                        author: session.user.name,
                        authorImg: session.user.image,
                        time: new Date()
                    },
                    views: 0,
                    like: 0,
                    commnets : []
                })
                if(postRes.status === 200) {
                    alert('업로드 성공')
                    history.back()
                } else {
                    alert(`업로드 실패 (errorCode : ${postRes.status}})`)
                    setPosting(false)
                }
            } catch(error) {
                if(error.response.status === 413) {
                    alert('파일 용량 초과')
                    setPosting(false)
                }
                else {
                    alert('업로드 실패')
                    setPosting(false)
                }
            }
        }
    }

    return (
        <>
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
                <div className="writeSection">
                    <h1>제목</h1>
                    <input id="title" placeholder="제목 입력"></input>
                    <div className="boardSelectCxt">
                        <h1>내용</h1>
                        <select className="boardSelect">
                            <option>잡담 게시판</option>
                            <option>공부 게시판</option>
                            {(session?.user.email == 'imaecommunity@gmail.com') ? (<option>공지 게시판</option>):(<></>)}
                        </select>
                    </div>
                    <CKEditor
                        editor={ ClassicEditor }
                        config={{ 
                            extraPlugins: [Base64UploaderPlugin],
                            language: 'ko' 
                        }}
                        onReady={ editor => {
                            setData(editor.getData())
                        } }
                        onChange={ ( event, editor ) => {
                            setData(editor.getData())
                        } }
                        onBlur={ ( event, editor ) => {
                        } }
                        onFocus={ ( event, editor ) => {
                        } }
                    />
                    <div className="writeBtns">
                        <div className="sendBtn btn" onClick={onBack.bind()} style={{backgroundColor:"#a9a9a9"}}> 나가기
                        </div>
                        {
                            (!(posting)) ? (
                                <div className="sendBtn btn" style={{marginLeft:"20px"}} onClick={onSent.bind()}>게시하기
                                    <svg className="sendIcon" width="36" height="33" viewBox="0 0 36 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M35.1522 15.7826L0.000182822 0L0 15.7826H35.1522ZM35.1522 17.9348L0.000182822 33L0 17.9348H35.1522Z" fill="white"/>
                                    </svg>
                                </div>
                            ) : (
                                <div className="sendBtn" style={{marginLeft:"20px"}}>업로드 중...
                                    <svg className="sendIcon" width="36" height="33" viewBox="0 0 36 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M35.1522 15.7826L0.000182822 0L0 15.7826H35.1522ZM35.1522 17.9348L0.000182822 33L0 17.9348H35.1522Z" fill="white"/>
                                    </svg>
                                </div>
                            )
                        }
                        
                    </div>
                </div>
                <div className="footer">© 2023 IMAE_DDD_Project. All Rights Reserved.<br></br>Made by ABELA With dddTeam</div>
            </div>
        </>
    )
}