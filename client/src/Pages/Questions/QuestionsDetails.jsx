import React, { useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import copy from "copy-to-clipboard";

import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import "./Questions.css";
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswer from "./DisplayAnswer";
import {
  postAnswer,
  deleteQuestion,
  voteQuestion,
} from "../../actions/question";
import TextEditor from "../AskQuestion/RichTextEditor/TextEditor";
import CodeDisplay from "../../components/CodeDisplay";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";


const QuestionsDetails = () => {
  const { id } = useParams();
  const questionsList = useSelector((state) => state.questionsReducer);

  const [Answer, setAnswer] = useState("");
  const [ansImg, setAnsImg] = useState("");
  const [ansVid, setAnsVid] = useState("");
  const [ansCode, setAnsCode] = useState("");
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const location = useLocation();
  const url = "https://numan-devquery.vercel.app";

  // console.log(User)

  const handlePostAns = (e, answerLength) => {
    e.preventDefault();

    if (User === null) {
      alert("Login or Signup to answer a question");
      Navigate("/Auth");
    } else {
      if (Answer === "") {
        alert("Enter an answer before submitting");
      } else {
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerLength + 1,
            answerBody: Answer,
            ansImg,
            ansVid,
            ansCode,
            userAnswered: User.result.name,
            userId:User.result._id,
            userPic: User.result.pic,
          })
        );
        setAnswer("");
        setAnsImg('')
        setAnsVid('')
      }
    }
  };

  const handleShare = () => {
    copy(url + location.pathname);
    alert("Copied url : " + url + location.pathname);
  };

  const handleDelete = () => {
    dispatch(deleteQuestion(id, Navigate));
  };

  const handleUpVote = () => {
    if (User === null) {
      alert("Login or Signup to up vote a question");
      Navigate("/Auth");
    } else {
      dispatch(voteQuestion(id, "upVote"));
    }
  };

  const handleDownVote = () => {
    if (User === null) {
      alert("Login or Signup to down vote a question");
      Navigate("/Auth");
    } else {
      dispatch(voteQuestion(id, "downVote"));
    }
  };

  return (
    <div className="question-details-page">
      {questionsList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionsList.data
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img
                        src={upvote}
                        alt=""
                        width="18"
                        className="votes-icon"
                        onClick={handleUpVote}
                      />
                      <p>{question.upVote.length - question.downVote.length}</p>
                      <img
                        src={downvote}
                        alt=""
                        width="18"
                        className="votes-icon"
                        onClick={handleDownVote}
                      />
                    </div>
                    <div className="question-bd" style={{ width: "100%" }}>
                      <p className="question-body" dangerouslySetInnerHTML={{__html: question.questionBody}}></p>
                      <div className="question-details-tags">
                        {question.questionTags.map((tag) => (
                          <p key={tag}>{tag}</p>
                        ))}
                      </div>
                      <div className="q-media">
                        { question.questionImg &&
                          <img className="qimg" src={question.questionImg} width="200px" alt="" />
                        }
                        { question.questionVid &&
                          // <video controls src={question.questionVid} width="600px" />
                          <VideoPlayer vidUrl={question.questionVid} />
                        }
                        { question.quesCode &&
                          <CodeDisplay code={question.quesCode}/>
                          
                          
                        }
                      </div>
                      <div className="question-actions-user">
                        <div>
                          <button type="button" onClick={handleShare}>
                            Share
                          </button>
                          {User?.result?._id === question?.userId && (
                            <button type="button" onClick={handleDelete}>
                              Delete
                            </button>
                          )}
                        </div>
                        <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          <Link
                            to={`/Users/${question.userId}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}
                          >
                            {question.userPic? 
                              <img src={question.userPic} alt="" width='30px' height='30px' style={{borderRadius:'50%'}} />
                              :
                              <Avatar
                              backgroundColor="orange"
                              px="8px"
                              py="5px"
                              borderRadius="4px"
                            >
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avatar>}
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h3>{question.noOfAnswers} Answers</h3>
                    <DisplayAnswer
                      key={question._id}
                      question={question}
                      handleShare={handleShare}
                    />
                  </section>
                )}
                <section className="post-ans-container">
                  <h3>Your Answer</h3>
                  <form style={{width:"100%"}}
                    onSubmit={(e) => {
                      handlePostAns(e, question.answer.length);
                    }}
                  >
                    
                    <TextEditor
                      setQuestionBody={setAnswer}
                      questionImg={ansImg} 
                      setQuestionImg={setAnsImg}
                      questionVid={ansVid} 
                      setQuestionVid={setAnsVid}
                      setQuesCode={setAnsCode}
                      quesCode={ansCode}
                    />

                    <br />
                    <input
                      type="submit"
                      className="post-ans-btn"
                      value="Post Your Answer"
                    />
                  </form>
                  <p className="f-text">
                    Browse other Question tagged
                    {question.questionTags.map((tag) => (
                      <Link to="/Tags" key={tag} className="ans-tags">
                        {" "}
                        {tag}{" "}
                      </Link>
                    ))}{" "}
                    or
                    <Link
                      to="/AskQuestion"
                      style={{ textDecoration: "none", color: "#009dff" }}
                    >
                      {" "}
                      ask your own question.
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default QuestionsDetails;
