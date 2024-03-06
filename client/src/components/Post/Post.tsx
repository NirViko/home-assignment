import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { PostData, UserData } from "../../types";
import "./styles.css";
import { ButtomBar } from "./ButtomBar";
import { TopBar } from "./TopBar";
import { PostEditor } from "../PostEditor";
import { useState } from "react";
interface IPost {
  post: PostData;
  user: UserData | undefined;
  deletePost: (id: number) => void;
  addLike: (id: number, userId: number | undefined) => void;
}

export const Post = (props: IPost) => {
  const { post, user, deletePost, addLike } = props;
  const [isEditor, setIsEditor] = useState<boolean>(false);
  return (
    <>
      <Card variant="outlined" sx={{ width: 600 }}>
        {user ? <TopBar user={user} postDate={post.date} /> : null}
        {post.imageUrl && (
          <CardMedia
            component="img"
            height="200"
            image={post.imageUrl}
            alt={post.imageUrl}
          />
        )}
        <CardContent>
          <Typography variant="h6" component="div">
            {post.content}
          </Typography>
        </CardContent>
        <ButtomBar
          setIsEditor={setIsEditor}
          deletePost={deletePost}
          post={post}
          userId={user?.id}
          addLike={addLike}
        />
      </Card>
      {user ? (
        <PostEditor
          isPutMethod={true}
          changeEditor={setIsEditor}
          isEditor={isEditor}
          userId={user.id}
          post={post}
        />
      ) : null}
    </>
  );
};
