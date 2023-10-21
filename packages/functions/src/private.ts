import { APIGatewayProxyEvent } from "aws-lambda";

export async function handler(event: APIGatewayProxyEvent) {
  return {
    statusCode: 200,
    body: JSON.stringify({ isSuccess: true }),
  };
}
