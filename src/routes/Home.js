import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";
import WrapperContainer from "components/WrapperContainer";

import { dbService } from "fbase";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
`;

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    dbService.collection("tweets").onSnapshot((snapshot) => {
      setTweets(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);

  return (
    <WrapperContainer>
      <Container>
        <TweetFactory userObj={userObj} />
        <div>
          {tweets.map((tweet) => (
            <Tweet
              key={tweet.id}
              tweetObj={tweet}
              isOwner={tweet.creatorId === userObj.uid}
            />
          ))}
        </div>
      </Container>
    </WrapperContainer>
  );
};

export default Home;
