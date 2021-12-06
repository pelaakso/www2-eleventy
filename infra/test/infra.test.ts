import { Template } from 'aws-cdk-lib/assertions';
import * as cdk from 'aws-cdk-lib';
import * as Infra from '../lib/infra-stack';

test('Whole stack snapshot', () => {
  const stack = new cdk.Stack();

  const myStack = new Infra.InfraStack(stack, 'MyTestStack', {
    env: { account: '140966923789', region: 'eu-central-1' },
  });

  const template = Template.fromStack(myStack);
  expect(template).toMatchSnapshot();
});
