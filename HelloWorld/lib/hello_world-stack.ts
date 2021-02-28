import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import { IVpc } from '@aws-cdk/aws-ec2';
import * as ecs_patterns from '@aws-cdk/aws-ecs-patterns';
import * as path from 'path';


export class HelloWorldStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    let vpc:IVpc

    if(process.env.VPC_ID != null){
      vpc = ec2.Vpc.fromLookup(this, process.env.VPC_ID, {})
    }else{
      vpc =  new ec2.Vpc(this, 'DTHelloWorldVPC', {
        maxAzs: 3
      })
    }
  
    const cluster = new ecs.Cluster(this, 'DTHelloWorldCluster', {
      vpc: vpc
    })

    new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'DTHelloWorldFargateService', {
      cluster: cluster,
      cpu: 512,
      desiredCount: 3,
      taskImageOptions: {image: ecs.ContainerImage.fromAsset(path.resolve(__dirname, '..','container'))},
      memoryLimitMiB: 2048,
      publicLoadBalancer: true
    })

  }
}
