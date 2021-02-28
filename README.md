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
Because I did not get this code to deploy a functioning application it is separate from the other code in its own branch. I did not have time to debug the error messages indicating that the hosted zone was not available, but the code is still useful as it shows my approach to the problem.
The HelloWorld flder conatins a CDK project with Route53, public facing loadbalancer, ECS (Fargate) which runs a Docker container (nginx server serving an hello world html page).

### Run the code

If this is the first time you are deploying a CDK project run
```
cdk bootstrap
```

To deploy the infrastructure run 

```
cdk deploy
```
