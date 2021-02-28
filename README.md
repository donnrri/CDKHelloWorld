# CDKHelloWorld

This appplication uses the Cloud Development Kit (CDK) and is written in Typescript.

### Prerequisites
1. Latest version of Node installed
2. Cloud Development Kit version 1.91.0

### Repository Notes
The repository has the following branches

##### Main.  
This branch contains to folders 
1. HelloWorld  containing  CDK project  code for the a public facing loadbalancer, ECS (Fargate) which runs a Docker container (nginx server serving an hello world html page).
2. CICDHelloWorld containing  CDK project  code for a CICD piplline for delpoyment of CDK stacks. Note that an access key must be available from your AWS Secrets Manager Service and the key for this secret must nbe 'github-token' see CICDHelloWorld/lib/config.json

### 
