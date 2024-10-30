import { useState } from "react";
import useStore from "../Store/UseStore";

const useSignIn = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { signInUser } = useStore();

  const handleSignIn = async (
    name: string,
    surname: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    setError(null);
    setSuccess(false);

    if (!name || !surname || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    await signInUser(name, surname, email, password);

    if (!useStore.getState().error) {
      setSuccess(true);
    } else {
      setError(useStore.getState().error);
    }
  };

  return { error, success, handleSignIn };
};

export default useSignIn;
