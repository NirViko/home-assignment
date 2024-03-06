import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { UserData } from "../../types";
import "./styles.css";
import { UserAvatar } from "../UserAvatar";
import { useEffect, useState } from "react";

type HeaderProps = {
  users: UserData[];
  openPostEditor: (userId: number) => void;
};

export const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const MAX_IDS = 10;
  const { users, openPostEditor } = props;
  const [usersId, setUsersId] = useState<number[]>([]);
  const [user, setUser] = useState<UserData>({ id: 0, name: "" });

  useEffect(() => {
    if (users.length > 0) switchUser();
  }, [users]);

  const switchUser = () => {
    const randomUserId = Math.floor(Math.random() * 10) + 1;
    if (usersId.length === MAX_IDS) {
      setUsersId([]);
    }
    if (!usersId.includes(randomUserId)) {
      const userFound = users.find((user) => user.id === randomUserId);
      setUser(userFound ? userFound : user);
      setUsersId((prevState) => [...prevState, randomUserId]);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar disableGutters className="app-toolbar">
        <Tooltip title="Switch User">
          <IconButton
            onClick={() => {
              switchUser();
            }}
          >
            <UserAvatar user={user} className="user-avatar" />
          </IconButton>
        </Tooltip>
        <div>
          <Typography className="app-title main" variant="h6">
            BriefCam Social
          </Typography>
          <Typography className="app-title" variant="subtitle1" lineHeight={1}>
            {user.name}
          </Typography>
        </div>
        <Tooltip title="Add Post">
          <IconButton onClick={() => openPostEditor(user.id)}>
            <AddOutlined htmlColor="white" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
