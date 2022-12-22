import { authService, dbService } from "fbase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ userObj }) => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  useEffect(() => {
    getMyTweets();
  }, []);

  const getMyTweets = async () => {
    const tweets = await dbService
      .collection("tweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createAt")
      .get();

    console.log(tweets.docs.map((doc) => doc.data()));
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
