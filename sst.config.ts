import { SSTConfig } from "sst";
import { AppStack } from "./stacks/AppStack";

export default {
  config(_input) {
    return {
      name: "workshop-booking-app",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(AppStack);
  },
} satisfies SSTConfig;
