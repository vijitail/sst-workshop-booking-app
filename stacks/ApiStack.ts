import { StackContext, Api, use } from "sst/constructs";
import { AuthStack } from "./AuthStack";

export function ApiStack({ stack }: StackContext) {
  const { auth } = use(AuthStack);
  const api = new Api(stack, "Api", {
    authorizers: {
      userPool: {
        type: "user_pool",
        userPool: {
          id: auth.userPoolId,
          clientIds: [auth.userPoolClientId],
        },
      },
    },
    defaults: {
      authorizer: "userPool",
    },
    routes: {
      "POST /private": "packages/functions/src/private.handler",
    },
  });

  stack.addOutputs({
    api_url: api.url,
  });

  auth.attachPermissionsForAuthUsers(stack, [api]);

  return {
    api,
  };
}
