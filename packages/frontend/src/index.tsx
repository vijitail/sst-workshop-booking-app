import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    region: process.env.APP_REGION,
    userPoolId: process.env.USER_POOL_ID,
    userPoolWebClientId: process.env.USER_POOL_CLIENT_ID,
    mandatorySignIn: false,
    oauth: {
      domain: `${
        process.env.COGNITO_DOMAIN +
        ".auth." +
        process.env.APP_REGION +
        ".amazoncognito.com"
      }`,
      scope: ["email", "profile", "openid", "aws.cognito.signin.user.admin"],
      redirectSignIn: "https://localhost:1234", // Make sure to use the exact URL
      redirectSignOut: "https://localhost:1234", // Make sure to use the exact URL
      responseType: "token",
    },
  },
  API: {
    endpoints: [
      {
        name: "api",
        endpoint: process.env.API_URL,
        region: process.env.APP_REGION,
      },
    ],
  },
});

const container = document.getElementById("app");
const root = createRoot(container as HTMLElement);
root.render(<App />);
