import {Construct, StackProps, Stage } from '@aws-cdk/core';
import { HelloWorldStack } from '../../HelloWorld/lib/hello_world-stack'; 
export class WebServiceStage extends Stage {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new HelloWorldStack(this, 'WebService', {
      tags: {
        Application: 'WebService',
        Environment: id
      }
    });  
  }
}