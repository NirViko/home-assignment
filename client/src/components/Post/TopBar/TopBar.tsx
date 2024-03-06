import { Typography } from "@mui/material";
import "./styles.css";
import { UserData } from "../../../types";
import { UserAvatar } from "../../UserAvatar";
interface IPost {
  postDate: string;
  user: UserData;
}

export const TopBar = (props: IPost) => {
  const { postDate, user } = props;

  return (
    <>
      <div className="container">
        <UserAvatar user={user} className="user-avatar" />
        <div>
          <Typography variant="body2" component="div">
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {postDate}
          </Typography>
        </div>
      </div>
    </>
  );
};
