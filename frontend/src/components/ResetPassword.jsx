import React, { useState } from "react";
import axios from "axios";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [resetToken, setResetToken] = useState("");

  // Function to extract the reset token from the URL (you may need to adjust this)
  const extractResetToken = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      setResetToken(token);
    }
  };

  // When the component mounts, extract the reset token from the URL
  useEffect(() => {
    extractResetToken();
  }, []);

  const handleResetPassword = () => {
    // Frontend validation (e.g., password match) can be done here
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    axios
      .post("https://api.allindiamarketinghrsolution.com/reset-password", {
        password,
        resetToken, // Pass the reset token to the server
      })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("An error occurred while resetting the password");
      });
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <div>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handleResetPassword}>Reset Password</button>
      <div>{message}</div>
    </div>
  );
}

export default ResetPassword;
