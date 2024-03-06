import express, { Express, Request, Response } from "express";
import cors from "cors";
import { User } from "./ModelView/User";
import fs from "fs";
import path from "path";
import { Post } from "./ModelView/Post";

const app: Express = express();
app.use(cors());
app.use(express.json());
const port = 3000;

const usersFilePath = path.resolve(__dirname, "../db/users.json");
const postsFilePath = path.resolve(__dirname, "../db/posts.json");

app.get("/users", (req: Request, res: Response<User[]>) => {
  fs.readFile(usersFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading users.json:", err);
      return;
    }
    res.send(JSON.parse(data));
  });
  console.log("Received request for /users");
});

app.get("/posts", (req: Request, res: Response<Post[]>) => {
  fs.readFile(postsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading posts.json:", err);
      return;
    }
    const posts = JSON.parse(data) as Post[];
    const sortedPosts = posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    res.status(200).send(sortedPosts);
  });
});

app.post("/posts", (req: Request, res: Response) => {
  const newPost: Post = {
    ...req.body,
    likes: 0,
    usersLike: [],
  };

  fs.readFile(postsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading posts.json");
    }

    let posts: Post[] = [];
    if (data) {
      try {
        posts = JSON.parse(data);
      } catch (error) {
        console.error(error);
        return res.status(500).send("Error parsing posts.json");
      }
    }
    newPost.id = posts[posts.length - 1].id + 1;
    posts.push(newPost);

    fs.writeFile(postsFilePath, JSON.stringify(posts), (err) => {
      if (err) {
        return res.status(500).send("Error writing posts.json");
      }
      res.status(200).send(newPost);
    });
  });
});

app.delete("/posts/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  fs.readFile(postsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500);
    }

    let posts: Post[] = [];

    if (data) {
      try {
        posts = JSON.parse(data);
      } catch (error) {
        console.error(error);
        return res.status(500);
      }
    }

    const afterDelete = posts.filter((post) => post.id !== parseInt(id));

    fs.writeFile(postsFilePath, JSON.stringify(afterDelete), (err) => {
      if (err) {
        return res.status(500).send(" Error writing posts.json");
      }
      res.status(200).send({ message: "successfully" });
    });
  });
});

app.put("/updateLikes/:id", (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);
  const userId: number = req.body;
  fs.readFile(postsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading posts.json");
    }
    let posts: Post[] = [];

    if (data) {
      try {
        posts = JSON.parse(data);
      } catch (error) {
        console.error(error);
        return res.status(500).send("Error parsing posts.json");
      }
    }
    const postIndex = posts.findIndex((post) => post.id === postId);

    if (postIndex !== -1) {
      posts[postIndex].likes++;
      posts[postIndex].usersLike.push(userId);
    }
    fs.writeFile(postsFilePath, JSON.stringify(posts), (err) => {
      if (err) {
        return res.status(500).send("Error writing posts.json");
      }
      res.status(200).send({ message: "Like add" });
    });
  });
});

app.put("/posts/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const editPost: Post = req.body;
  fs.readFile(postsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading posts.json");
    }
    let posts: Post[] = [];

    if (data) {
      try {
        posts = JSON.parse(data);
      } catch (error) {
        console.error(error);
        return res.status(500).send("Error parsing posts.json");
      }
    }
    const postId = parseInt(id);
    const postIndex = posts.findIndex((post) => post.id === postId);

    if (postIndex !== -1) {
      posts[postIndex].content = editPost.content;
      posts[postIndex].date = editPost.date;
      posts[postIndex].imageUrl = editPost.imageUrl;
    }
    fs.writeFile(postsFilePath, JSON.stringify(posts), (err) => {
      if (err) {
        return res.status(500).send("Error writing posts.json");
      }
      res.status(200).send({ message: "Post deleted successfully" });
    });
  });
});

app.listen(port, () => {
  console.log(`🔋 Server is running at http://localhost:${port}`);
});
