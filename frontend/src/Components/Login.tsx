import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../Store/UseStore";
import "../Styles/LoginStyle.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const { loginUser, error, user } = useStore();

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/HomeAdmin");
      } else if (user.role === "client") {
        navigate("/HomeClient");
      }
    }
  }, [user, navigate]);

  const onButtonClick = async () => {
    setEmailError("");
    setPasswordError("");
    await loginUser(email, password);

    if (error) {
      setPasswordError(error || "An error occurred during login");
    }
  };

  const onButtonClickSignUp = () => {
    navigate("/Signin");
  };

  return (
    <div className="bodyLogin">
      <div className="containerLogin">
        <div className="picture"></div>
        <div className="mainContainer">
          <div className="titleContainer">
            <span>Login</span>
          </div>
          <br />
          <div className="inputContainer">
            <input
              type="email"
              value={email}
              placeholder="Enter your email here"
              onChange={(ev) => setEmail(ev.target.value)}
              className={"inputBox"}
            />
            <label className="errorLabel">{emailError}</label>
          </div>
          <br />
          <div className="inputContainer">
            <input
              type="password"
              value={password}
              placeholder="Enter your password here"
              onChange={(ev) => setPassword(ev.target.value)}
              className={"inputBox"}
            />
            <label className="errorLabel">{passwordError}</label>
          </div>
          <br />
          <div className="buttonContainer">
            <Button variant="contained" onClick={onButtonClick}>
              Log In
            </Button>
            <Button variant="contained" onClick={onButtonClickSignUp}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
