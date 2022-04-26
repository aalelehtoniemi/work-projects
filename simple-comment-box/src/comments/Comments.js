import { useState, useEffect } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import {
    getComments as getCommentsApi,
    createComment as createCommentApi,
    updateComment as updateCommentApi,
    deleteComment as deleteCommentApi,
  } from "../api";

const Comments = ({currentUserId}) => {
    const [backendComments, setBackendComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null)
    const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
    );

const getReplies = commendId => {
    return backendComments.filter(backendComment => backendComment.parentId === commendId).sort((a, b) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
};
const addComment = (text, parentId) => {
    console.log("addComment", text, parentId);
    createCommentApi(text, parentId).then(comment => {
    setBackendComments([comment, ...backendComments]);
    setActiveComment(null);    
    });
};
const deleteComment = (commentId) => {
    if (window.confirm("Haluatko varmasti poistaa kommentin?")) {
        deleteCommentApi(commentId).then(() => {
            const updatedBackendComments = backendComments.filter(
                (backendComment) => backendComment.id !== commentId
            );
            setBackendComments(updatedBackendComments);
        });
    }
};
const updateComment = (text, commentId) => {
    updateCommentApi(text, commentId).then(() => {
    const updatedBackendComments = backendComments.map(backendComment => {
        if (backendComment.id === commentId) {    
            return {...backendComment, body: text};    
        }
        return backendComment;
    });
    setBackendComments(updatedBackendComments);
    setActiveComment(null);
    });
};

    useEffect(() => {
    getCommentsApi().then((data) => {
        setBackendComments(data);
    });
        }, []);

    return ( 
    <div className="comments">
    <h3 className="comments-title">Kommentit</h3>
    <div className="comment-form-title">Kirjoita kommentti</div>
    <CommentForm submitLabel="Kirjoita" handleSubmit={addComment}/>
    <div className="comments-container">
{rootComments.map(rootComment => (
    <Comment
     key={rootComment.id}
    comment={rootComment}
    replies={getReplies(rootComment.id)}
    currentUserId={currentUserId}
    deleteComment={deleteComment}
    activeComment={activeComment}
    updateComment={updateComment}
    setActiveComment={setActiveComment}
    addComment={addComment}
    />
))}
    </div>
    </div>
    )
  };
  
  export default Comments;