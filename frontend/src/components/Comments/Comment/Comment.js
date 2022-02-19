import React, { useContext } from "react";
import DayJS from "react-dayjs";

import { deleteComment } from "../../../api/comments";

import { AuthContext } from "../../Context/AuthContext";

const Comment = ({ comment, handlePosts, onePost, retrievePost /*usestate, setusestate*/ }) => {
  // test usecontext
  // const { reload, setReload } = useContext(AuthContext);
  // useEffect(() => {
  //   console.log(reload);
  //   setReload(false)
  // }, [reload]);
  const { isAdmin, token, userId } = useContext(AuthContext);

  const delComment = () => {
    if (isAdmin || userId === comment.User.uuid)
      deleteComment(comment.id, token || localStorage.getItem("token"))
        .then(() => {
          if (onePost) {
            retrievePost();
          } else {
            handlePosts();
          }
          console.log("commentaire supprimé");
        })
        .catch(() => console.log("erreur suppression commentaire"));
  };

  return (
    <div className="comment__card">
      {(isAdmin || userId === comment.User.uuid) && (
        <button className="comment__delete" onClick={delComment}>
          <i className="fa-solid fa-circle-xmark"></i>
        </button>
      )}
      <h3>{{ comment }.comment.comments}</h3>
      <p>
        Commenté par {{ comment }.comment.User.first_name} {{ comment }.comment.User.last_name}
      </p>
      <p>
        <DayJS format="DD-MM-YY / HH:mm:ss">{{ comment }.comment.createdAt}</DayJS>
      </p>
      {/* {test up state} */}
      {/* <button onClick={() => setReload(true)}></button> */}
      {/* {test context} */}
      {/* <button onClick={() => setusestate(usestate + 1)}></button> */}
    </div>
  );
};

export default Comment;