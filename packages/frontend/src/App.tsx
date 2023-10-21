import { Auth, API } from "aws-amplify";
import React, { useState, useEffect } from "react";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";

export const App = () => {
  const [user, setUser] = useState<Record<string, any>>();
  const [loading, setLoading] = useState(true);

  // Get the current logged in user info
  const getUser = async () => {
    const user = await Auth.currentUserInfo();
    if (user) setUser(user);
    setLoading(false);
  };

  // Trigger Google login
  const signIn = async () =>
    await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google,
    });

  // Logout the authenticated user
  const signOut = async () => await Auth.signOut();

  // Send an API call to the /public endpoint
  const publicRequest = async () => {
    const response = await API.get("api", "/public", {});
    alert(JSON.stringify(response));
  };

  // Send an API call to the /private endpoint with authentication details.
  const privateRequest = async () => {
    try {
      const response = await API.post("api", "/private", {
        headers: {
          Authorization: `Bearer ${(await Auth.currentSession())
            .getAccessToken()
            .getJwtToken()}`,
        },
      });
      alert(JSON.stringify(response));
    } catch (error) {
      alert(error);
    }
  };

  // Check if there's any user on mount
  useEffect(() => {
    getUser();
  }, []);

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2>SST + Cognito + Google OAuth + React</h2>
      {user ? (
        <div className="profile">
          <p>Welcome {user.attributes.given_name}!</p>
          <img
            src={user.attributes.picture}
            style={{ borderRadius: "50%" }}
            width={100}
            height={100}
            alt=""
          />
          <p>{user.attributes.email}</p>
          <button onClick={signOut}>logout</button>
        </div>
      ) : (
        <div>
          <p>Not signed in</p>
          <button onClick={signIn}>login</button>
        </div>
      )}
      <div className="api-section">
        <button onClick={publicRequest}>call /public</button>
        <button onClick={privateRequest}>call /private</button>
      </div>
    </div>
  );
};
