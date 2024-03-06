import { useEffect, useState } from "react";
import { Header, PostEditor } from "./components";
import { UserData } from "./types";
import "./index.css";
import { Post } from "./components/Post";
import { fetchData } from "./requests/requests";
import { Posts } from "./components/Posts";
function App() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false);
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const users = await fetchData("http://localhost:3000/users");
    if (users) setUsers(users);
  };

  const openEditor = (userId: number) => {
    setIsPostEditorOpen(true);
    setUserId(userId);
  };

  return (
    <>
      <Header openPostEditor={openEditor} users={users} />
      <Posts users={users} />
      <PostEditor
        isPutMethod={false}
        changeEditor={setIsPostEditorOpen}
        isEditor={isPostEditorOpen}
        userId={userId}
      />
    </>
  );
}

export default App;
