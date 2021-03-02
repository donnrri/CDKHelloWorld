# CDKHelloWorld

This appplication uses the Cloud Development Kit (CDK) and is written in Typescript. 

### Prerequisites
1. Latest version of Node installed
2. Cloud Development Kit version 1.91.0

## Repository Notes
The repository has the following branches

### Main.  
This branch contains two folders 
1. HelloWorld  containing  CDK project  code for the a public facing loadbalancer, ECS (Fargate) which runs a Docker container (nginx server serving an hello world html page).
2. CICDHelloWorld containing  CDK project  code for a CICD piplline for delpoyment of CDK stacks. Note that an access key must be available from your AWS Secrets Manager Service and the key for this secret must be 'github-token' see CICDHelloWorld/lib/config.json

### cognito-login-branch
This branch represents my attempts to use Cognito in combination with the Application Load Balancer to handle user authentication. Because I did not get this code to deploy a functioning application, it is separate from the other code in its own branch. The folowing error is seen

```
   AWS::CloudFormation::CustomResource       | certificate/CertificateRequestorResource/Default (certificateCertificateRequestorResourceXXXXXX) Failed to create resource. Resource is not in the state certificateValidated
```

I belive this is a timeout issue and the certificate is taking too long to generate.  I am working on resolving thsi issue.

The HelloWorld folder conatins a CDK project with Route53, public facing loadbalancer, ECS (Fargate) which runs a Docker container (nginx server serving an hello world html page).

### Run the code
Install the reuired dependencies. Navigate into the HelloWorld folder arnd run

```
npm install
```

If this is the first time you are deploying a CDK project run
```
cdk bootstrap
```

To deploy the infrastructure run 

```
cdk deploy
```

#### Testing

Only simple snapshot tests are provided in the code. To run the test 

```
npm run test
```

