import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./styles.css";
import { fetchDataPost, fetchDataPut } from "../../requests/requests";
import { PostData } from "../../types";
import { useState } from "react";

interface IPostEditor {
  changeEditor: (value: boolean) => void;
  isEditor: boolean;
  userId: number;
  post?: PostData;
  isPutMethod: boolean;
}

export const PostEditor = (props: IPostEditor) => {
  const url = "http://localhost:3000/posts";
  const { changeEditor, isEditor, userId, post, isPutMethod } = props;
  const [content, setContent] = useState<string>(post ? post.content : "");
  const [image, setImage] = useState<string>(
    post?.imageUrl ? post?.imageUrl : ""
  );

  const handleClose = () => {
    changeEditor(false);
  };

  return (
    <>
      <Dialog
        open={isEditor}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: () => {
            const request = {
              userId: userId,
              date: new Date().toISOString(),
              content: content,
              imageUrl: image !== "" ? image : null,
            };
            isPutMethod && post
              ? fetchDataPut(url, post.id, request)
              : fetchDataPost(url, request);
            handleClose();
          },
        }}
      >
        <DialogTitle>{post ? "Edit Post" : "New Post"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
            margin="dense"
            label="Content"
            fullWidth
            multiline
            variant="standard"
          />
          <TextField
            autoFocus
            onChange={(event) => setImage(event.target.value)}
            value={image}
            size="medium"
            margin="dense"
            label="Image"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
