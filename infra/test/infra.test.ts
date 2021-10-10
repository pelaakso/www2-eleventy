import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Infra from '../lib/infra-stack';

test('Whole stack snapshot', () => {
    const stack = new cdk.Stack();
    const myStack = new Infra.InfraStack(stack, 'MyTestStack', {
      env: { account: '140966923789', region: 'eu-central-1' },
    });
    
    expect(SynthUtils.toCloudFormation(myStack)).toMatchSnapshot();
});
