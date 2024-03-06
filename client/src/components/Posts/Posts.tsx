import React, { useEffect, useState } from "react";
import { PostData, UserData } from "../../types";
import { Post } from "../Post";
import { fetchData, fetchDataPut } from "../../requests/requests";
import "./styles.css";
interface IPosts {
  users: UserData[];
}

export const Posts = (props: IPosts) => {
  const { users } = props;
  const [posts, setPosts] = useState<PostData[]>([]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const posts = await fetchData("http://localhost:3000/posts");
    if (posts) setPosts(posts);
  };

  const getUserById = (id: number): UserData | undefined => {
    return users.find((user) => user.id === id);
  };

  const deletePost = (id: number) => {
    const postAfterDelete = posts.filter((post) => post.id !== id);
    setPosts([...postAfterDelete]);
  };

  const addlike = (id: number, userId: number | undefined) => {
    const index = posts.findIndex((post) => post.id === id);
    if (userId) {
      if (!posts[index].usersLike.includes(userId)) {
        posts[index].likes++;
        posts[index].usersLike.push(userId);
      } else {
        posts[index].likes--;
        const userIdIndex = posts[index].usersLike.indexOf(userId);
        posts[index].usersLike.splice(userIdIndex, 1);
      }
      setPosts([...posts]);
      fetchDataPut("http://localhost:3000/updateLikes", id, { userId: userId });
    }
  };

  return (
    <div className="posts-wrapper">
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          user={getUserById(post.userId)}
          deletePost={deletePost}
          addLike={addlike}
        />
      ))}
    </div>
  );
};
