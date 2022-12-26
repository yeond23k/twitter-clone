import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;
const TweetInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 20px;
  width: 100%;
`;
const Input = styled.input`
  flex-grow: 1;
  height: 40px;
  padding: 0px 20px;
  color: white;
  border: 1px solid #04aaff;
  border-radius: 20px;
  font-weight: 500;
  font-size: 12px;
  background-color: black;
`;
const SubmitTweet = styled.input`
  position: absolute;
  right: 0;
  background-color: #04aaff;
  height: 40px;
  width: 40px;
  padding: 10px 0px;
  text-align: center;
  border-radius: 20px;
  color: white;
`;
const Label = styled.label`
  cursor: pointer;
  color: #04aaff;
`;
const Span = styled.span`
  margin-right: 10px;
  font-size: 12px;
`;

const AttachContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AttachClearButton = styled.div`
  color: #04aaff;
  cursor: pointer;
  text-align: center;
`;
const AttachClearSpan = styled.span`
  margin-right: 10px;
  font-size: 12px;
`;

const TweetFactory = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    if (tweet === "") return;
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }

    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await dbService.collection("tweets").add(tweetObj);
    setTweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setTweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment("");

  return (
    <Form onSubmit={onSubmit}>
      <TweetInputContainer>
        <Input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <SubmitTweet type="submit" value="&rarr;" />
      </TweetInputContainer>
      <Label htmlFor="attach-file">
        <Span>Add photos</Span>
        <FontAwesomeIcon icon={faPlus} />
      </Label>
      <input
        type="file"
        accept="image/*"
        id="attach-file"
        onChange={onFileChange}
        style={{ opacity: 0 }}
      />

      {attachment && (
        <AttachContainer>
          <img
            alt=""
            src={attachment}
            style={{
              backgroundImage: attachment,
              height: "80px",
              width: "80px",
              borderRadius: "40px",
            }}
          />
          <AttachClearButton onClick={onClearAttachment}>
            <AttachClearSpan>Remove</AttachClearSpan>
            <FontAwesomeIcon icon={faTimes} />
          </AttachClearButton>
        </AttachContainer>
      )}
    </Form>
  );
};

export default TweetFactory;
