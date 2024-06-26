import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import firebase from 'firebase/compat/app'

import "./AskQuestion.css";
import { askQuestion } from "../../actions/question";
import TextEditor from "./RichTextEditor/TextEditor";

const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [quesCode, setQuesCode] = useState("");
  const [questionImg, setQuestionImg] = useState("");
  const [questionVid, setQuestionVid] = useState("");
  const [questionTags, setQuestionTags] = useState("");
  const [userPic, setUserPic] = useState("")
  const [user, setUser] = useState("")
  const [flag, setFlag] = useState(true)
  const [save, setSave] = useState(true);

  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
 
  const navigate = useNavigate();

  const handleGetNotifs = async (userPosted, postBody) => {
    try {
      const id = Math.random() * Math.floor(Math.random()*1000);
      const notifType = 'question'
      const notificationData = {userPosted,postBody,id,notifType}
      // Save data to Firebase Realtime Database
      const notificationsRef = firebase.database().ref('notifications');
      await notificationsRef.push(notificationData);

      console.log('Notification saved successfully\n'+ userPosted +" "+ postBody + "\n" +id);
    } catch (error) {
      console.log('Error saving notification:', error);
    }
  };


  if(User&& flag){
    setUserPic(User.result.pic)
    setUser(User.result.name)
    setFlag(false)
  }
  
  const handleSubmit = (e) => {

    e.preventDefault();
    // console.log(questionBody)
    setSave(true)
    if (User) {
    
      if (questionTitle && questionBody && questionTags) {

        const notifBody = questionTitle.substring(0,50);
        handleGetNotifs(User.result.name,notifBody)

        dispatch(
          askQuestion(
            {
              questionTitle,
              questionBody,
              quesCode,
              questionImg,
              questionVid,
              questionTags,
              userPosted: User.result.name,
              userPic: User.result.pic,
            },
            navigate('/')
          )
        );
      } else alert("Please enter all the fields");
    } else alert("Login to ask question");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n");
    }
  };

  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
             
              <input
                type="text"
                id="ask-ques-title"
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
             
              <TextEditor 
              setQuestionBody={setQuestionBody}
              questionImg={questionImg} 
              setQuestionImg={setQuestionImg}
              questionVid={questionVid} 
              setQuestionVid={setQuestionVid}
              quesCode={quesCode}
              setQuesCode={setQuesCode}
              save={save}
              setSave={setSave}
              />
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
                type="text"
                id="ask-ques-tags"
                onChange={(e) => {
                  setQuestionTags(e.target.value.split(" "));
                }}
                placeholder="e.g. (javaScript HTML C++)"
              />
            </label>
          </div>
          <button
            
            type="submit"
            className="review-btn"
          >
            Submit your question
          </button>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
