import { Cognito, StackContext } from "sst/constructs";
import * as cognito from "aws-cdk-lib/aws-cognito";

export function AuthStack({ stack, app }: StackContext) {
  const auth = new Cognito(stack, "Auth", {
    cdk: {
      userPoolClient: {
        supportedIdentityProviders: [
          cognito.UserPoolClientIdentityProvider.GOOGLE,
        ],
        oAuth: {
          callbackUrls: ["http://localhost:1234"],
          logoutUrls: ["http://localhost:1234"],
        },
      },
    },
  });

  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET)
    throw new Error("Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET");

  const provider = new cognito.UserPoolIdentityProviderGoogle(stack, "Google", {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    userPool: auth.cdk.userPool,
    scopes: ["profile", "email", "openid"],
    attributeMapping: {
      email: cognito.ProviderAttribute.GOOGLE_EMAIL,
      givenName: cognito.ProviderAttribute.GOOGLE_GIVEN_NAME,
      familyName: cognito.ProviderAttribute.GOOGLE_FAMILY_NAME,
      profilePicture: cognito.ProviderAttribute.GOOGLE_PICTURE,
    },
  });

  auth.cdk.userPoolClient.node.addDependency(provider);

  const domain = auth.cdk.userPool.addDomain("AuthDomain", {
    cognitoDomain: {
      domainPrefix: `${app.stage}-vijit-demo-auth-domain`,
    },
  });

  stack.addOutputs({
    auth_client_id: auth.userPoolClientId,
    auth_domain: domain.domainName,
  });

  return {
    auth,
    domain,
  };
}
