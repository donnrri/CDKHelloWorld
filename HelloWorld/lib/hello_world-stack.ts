import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';

export class HelloWorldStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'HelloWorldVPC', {
      maxAzs: 3
    })

    const cluster = new ecs.Cluster(this, 'HelloWorldCluster', {
      vpc: vpc
    })

  }
}
