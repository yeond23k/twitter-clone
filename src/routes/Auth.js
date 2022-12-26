import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fbase";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ButtonGroups = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 320px;
`;
const Button = styled.button`
  cursor: pointer;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 12px;
  text-align: center;
  width: 150px;
  background: white;
`;

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <Container>
      <FontAwesomeIcon
        icon={faTwitter}
        color="#04AAFF"
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <ButtonGroups>
        <Button onClick={onSocialClick} name="google">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </Button>
        <Button onClick={onSocialClick} name="github">
          Continue with Githubm <FontAwesomeIcon icon={faGithub} />
        </Button>
      </ButtonGroups>
    </Container>
  );
};

export default Auth;
