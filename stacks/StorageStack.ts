import { StackContext, Table } from "sst/constructs";

export function StorageStack({ stack }: StackContext) {
  const usersTable = new Table(stack, "Users", {
    fields: {
      userId: "string",
    },
    primaryIndex: { partitionKey: "userId" },
  });

  const workshopsTable = new Table(stack, "Workshops", {
    fields: {
      workshopId: "string",
      userId: "string",
    },
    primaryIndex: { partitionKey: "userId", sortKey: "workshopId" },
  });

  return {
    usersTable,
    workshopsTable,
  };
}
