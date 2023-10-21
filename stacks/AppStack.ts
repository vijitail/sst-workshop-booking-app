import { StackContext } from "sst/constructs";
import { ApiStack } from "./ApiStack";
import { AuthStack } from "./AuthStack";
import { FrontendStack } from "./FrontendStack";

export function AppStack({ app }: StackContext) {
  console.log("YOO!!!");
  // app.stack(FrontendStack).stack(ApiStack).stack(AuthStack);
  app.stack(AuthStack).stack(ApiStack).stack(FrontendStack);
  // app.stack(StorageStack);
}
