import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

export const lambdaHandler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log(`Www2Eleventy subscribe newsletter handler called. Input event is: ${JSON.stringify(event)}`);
  console.log('This is a no-op ATM.');

  return '{"status": 200, "success": 1, "message": ""}';
};
