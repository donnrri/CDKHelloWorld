import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as CicdHelloWorld from '../lib/cicd_hello_world-stack';

test('Empty Stack', () => {
    const stack = new cdk.Stack()
    // WHEN
    new CicdHelloWorld.CicdHelloWorldStack(stack, 'MyTestStack');
    // THEN
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});
