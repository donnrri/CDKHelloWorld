import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import { IVpc } from '@aws-cdk/aws-ec2';
import * as ecs_patterns from '@aws-cdk/aws-ecs-patterns';
import * as route53 from '@aws-cdk/aws-route53'
import * as certmanager from '@aws-cdk/aws-certificatemanager';
import * as cognito from "@aws-cdk/aws-cognito";
import * as path from 'path';


export class HelloWorldStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    let vpc:IVpc
    
    const pool = new cognito.UserPool(this, "DTHelloWorlUserPool", {
      selfSignUpEnabled: true,
      userPoolName:"DTHelloWorlUserPool"
    });

    const userPoolDomain = new cognito.CfnUserPoolDomain( 
      this, 
      "DTHelloWorldCustomDomain",
      {
        domain: 'hello-world-domain',
        userPoolId: pool.userPoolId

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
  
    const hostedZone = route53.HostedZone.fromLookup(this, "HostedZone",{
      domainName: process.env.DOMAIN_NAME,
      privateZone: false
      }
     )

   const certificate = new certmanager.DnsValidatedCertificate(
    this,
    "certificate",{
      hostedZone: hostedZone,
      domainName:  process.env.DOMAIN_NAME,
      region: process.env.REGION
    }
)

    const cluster = new ecs.Cluster(this, 'DTHelloWorldCluster', {
      vpc: vpc
    })

  const fargateService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'DTHelloWorldFargateService', {
      cluster: cluster,
      domainName:  process.env.DOMAIN_NAME',
      domainZone:hostedZone,
      certificate: certificate,
      cpu: 512,
      desiredCount: 3,
      taskImageOptions: {
        image: ecs.ContainerImage.fromAsset(path.resolve(__dirname, '..','container')),
      },
      memoryLimitMiB: 2048,
      publicLoadBalancer: true,
      assignPublicIp: true
    })

    fargateService.targetGroup.configureHealthCheck({
      enabled: true,
      path:'/healthcheck',
      healthyHttpCodes:'200'
      }
    )

    const securityGroup = fargateService.loadBalancer.connections.securityGroups[0]

    securityGroup.addEgressRule(ec2.Peer.anyIpv4(), new ec2.Port({
      protocol: ec2.Protocol.TCP,
      stringRepresentation:"443",
      fromPort: 443, 
      toPort: 443
    })
    )
  }
  
}
