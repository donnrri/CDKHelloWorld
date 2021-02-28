import { expect as expectCDK, matchTemplate, MatchStyle, SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import HelloWorld = require('../lib/hello_world-stack');

test('Empty Stack', () => {
    const stack = new cdk.Stack()
    // WHEN
    new HelloWorld.HelloWorldStack(stack, 'MyTestStack');
    // THEN
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});
