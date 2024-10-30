import React, { useState, useEffect } from "react";
import { Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useSignIn from "../Hooks/useSignIn";
import "../Styles/SigninStyle.css";

const Signin: React.FC = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { error, success, handleSignIn } = useSignIn();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        navigate("/Login");
      }, 2000);
    }
  }, [success, navigate]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="bodySignIn">
      <div className="containerS">
        <div className="picture"></div>
        <div className="mainContainer">
          <div className="titleContainer">
            <span>Sign Up</span>
          </div>
          <br />
          <div className="inputContainer">
            <input
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={(ev) => setName(ev.target.value)}
              className="inputBox"
            />
            <input
              type="text"
              value={surname}
              placeholder="Enter your surname"
              onChange={(ev) => setSurname(ev.target.value)}
              className="inputBox"
            />
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(ev) => setEmail(ev.target.value)}
              className="inputBox"
            />
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(ev) => setPassword(ev.target.value)}
              className="inputBox"
            />
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm your password"
              onChange={(ev) => setConfirmPassword(ev.target.value)}
              className="inputBox"
            />
            <label className="errorLabel">{error}</label>
          </div>
          <br />
          <div className="buttonContainer">
            <Button
              variant="contained"
              onClick={() =>
                handleSignIn(name, surname, email, password, confirmPassword)
              }
            >
              Sign Up
            </Button>
          </div>
        </div>

        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Account created successfully!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Signin;
