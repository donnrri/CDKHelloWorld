#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CicdHelloWorldStack } from '../lib/cicd_hello_world-stack';

const app = new cdk.App();
new CicdHelloWorldStack(app, 'CicdHelloWorldStack');