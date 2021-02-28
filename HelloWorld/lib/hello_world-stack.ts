import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import { IVpc } from '@aws-cdk/aws-ec2';
import * as ecs_patterns from '@aws-cdk/aws-ecs-patterns';
import * as route53 from '@aws-cdk/aws-route53'
import * as certmanager from '@aws-cdk/aws-certificatemanager';
import * as cognito from "@aws-cdk/aws-cognito";

import * as path from 'path';
import { hostname } from 'os';


export class HelloWorldStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    let vpc:IVpc

    const hostedZone = new route53.HostedZone(this, "HostedZone",{
        zoneName:'testdomainfinder.net'
      }
     )
  
    const cert = new certmanager.DnsValidatedCertificate(
      this,
      "Certificate",
      {      
        hostedZone: hostedZone,
        domainName:'testdomainfinder.net'
      }
    )

    const pool = new cognito.UserPool(this, "DTHelloWorlUserPool", {
      selfSignUpEnabled: true,
      userPoolName:"DTHelloWorlUserPool"
    });

    const userPoolDomain = new cognito.CfnUserPoolDomain( 
      this, 
      "DTHelloWorldCustomDomain",
      {
        domain:"helloworld",
        userPoolId: pool.userPoolId,

      }
    )

    const userpoolClient = new cognito.UserPoolClient( this, "DTHelloWorldUserPoolClinet", {
      generateSecret: true,
      userPool: pool,
      userPoolClientName: "DTHelloWorldUserPoolClinet"
    })


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
      certificate: cert,
      domainName: "testdomainfinder.net",
      domainZone: hostedZone,
      cpu: 512,
      desiredCount: 3,
      taskImageOptions: {image: ecs.ContainerImage.fromAsset(path.resolve(__dirname, '..','container'))},
      memoryLimitMiB: 2048,
      publicLoadBalancer: true
    })

  }
  
}
