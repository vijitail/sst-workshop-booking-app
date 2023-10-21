import { StackContext } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function AppStack({ app }: StackContext) {
  app.stack(StorageStack);
}
