import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {
  const isEditing =
  activeComment &&
  activeComment.type === "editing" &&
  activeComment.id === comment.id;
  const isReplying =
  activeComment &&
  activeComment.type === "replying" &&
  activeComment.id === comment.id;
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canDelete =
    currentUserId === comment.userId && replies.length === 0 && !timePassed;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
    return (
     <div key={comment.id} className="comment">
       <div className="comment-image-container">
       <img src="/user-icon.png" />
         </div>
         <div className="comment-right-part">
         <div className="comment-content">
           <div className="comment-author">{comment.username}</div>
           <div>{createdAt}</div>
         </div>
         {!isEditing && <div className="comment-text">{comment.body}</div>}
         {isEditing && (
           <CommentForm
            submitLabel="Päivitä"
            hasCancelButton
            initialText={comment.body}
            handlesubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => {
            setActiveComment(null);
            }}
           />
         )}
         <div className="comment-actions">
           {canReply && (
           <div
            className="comment-action"
             onClick={() =>
              setActiveComment({id:comment.id, type: "replying"})
            }
            >
              Vastaa
              </div>
              )}
           {canEdit && (
             <div
              className="comment-action"
               onClick={() =>
                setActiveComment({id:comment.id, type: "editing"})
              }
              >
              Muokkaa
              </div>
              )}
           {canDelete && (
              <div className="comment-action"
              onClick={() => deleteComment(comment.id)}
              >
              Poista
              </div>
              )}
         </div>
         {isReplying && (
           <CommentForm
            submitLabel="Vastaa"
             handleSubmit={(text) => addComment(text, replyId)}
           />
         )}
         {replies.length > 0 && (
           <div className="replies">
             {replies.map((reply) => (
               <Comment
               comment={reply}
               key={reply.id}
               setActiveComment={setActiveComment}
               activeComment={activeComment}
               updateComment={updateComment}
               deleteComment={deleteComment}
               addComment={addComment}
               parentId={comment.id}
               replies={[]}
               currentUserId={currentUserId}
                />
         ))}
         </div>
         )}
         </div>
         </div>
    );
  };
  
  export default Comment;