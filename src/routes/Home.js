import { useState } from "react";

const Home = () => {
  const [twit, setTwit] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setTwit(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={twit}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Twit" />
      </form>
    </div>
  );
};

export default Home;
