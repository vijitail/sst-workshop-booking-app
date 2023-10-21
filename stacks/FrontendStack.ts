import { StackContext, StaticSite, use } from "sst/constructs";
import { ApiStack } from "./ApiStack";
import { AuthStack } from "./AuthStack";

export function FrontendStack({ stack, app }: StackContext) {
  const { api } = use(ApiStack);

  const { auth, domain } = use(AuthStack);

  const site = new StaticSite(stack, "Frontend", {
    path: "packages/frontend",
    buildOutput: "dist",
    buildCommand: "npm run build",
    environment: {
      COGNITO_DOMAIN: domain.domainName,
      API_URL: api.url,
      APP_REGION: app.region,
      USER_POOL_ID: auth.userPoolId,
      IDENTITY_POOL_ID: auth.cognitoIdentityPoolId!,
      USER_POOL_CLIENT_ID: auth.userPoolClientId,
    },
  });

  stack.addOutputs({
    site_url: site.url,
  });
}
