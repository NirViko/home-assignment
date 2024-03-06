import { IconButton } from "@mui/material";
import { ThumbUp, Delete, Create } from "@mui/icons-material";
import "./styles.css";
import { PostData } from "../../../types";
import { deletePostById } from "../../../requests/requests";

interface IButtomBar {
  deletePost: (id: number) => void;
  setIsEditor: (isEditor: boolean) => void;
  addLike: (id: number, userId: number | undefined) => void;
  post: PostData;
  userId: number | undefined;
}

export const ButtomBar = (props: IButtomBar) => {
  const { deletePost, post, addLike, userId, setIsEditor } = props;
  const isLike = post && post.likes > 0;
  const url = `http://localhost:3000/posts`;

  return (
    <div className="buttomBar">
      <div className="likeContiner">
        <IconButton
          onClick={() => addLike(post.id, userId)}
          color={isLike ? "primary" : "default"}
        >
          <ThumbUp />
        </IconButton>
        {isLike ? <div className="likeCounter">{post.likes}</div> : null}
      </div>

      <div>
        <IconButton onClick={() => setIsEditor(true)}>
          <Create />
        </IconButton>
        <IconButton
          onClick={() => {
            deletePost(post.id);
            deletePostById(url, post.id);
          }}
        >
          <Delete />
        </IconButton>
      </div>
    </div>
  );
};
