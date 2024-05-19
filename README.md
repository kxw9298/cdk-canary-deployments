# Lambda Canary Deployments with CodeDeploy using the CDK

This repository contains an example of implementing CDK L4 Constructs to perform advanced deployments using AWS CodeDeploy.

The repository contains the CDK logic to deploy a Product API with create product endpoint using AWS API Gateway and AWS Lambda.

This repository accompanies the [Lambda Canary Deployments with CodeDeploy using the CDK](https://jcdubs.medium.com/applied-standards-through-cdk-l4-constructs-e2c98cf102aa) blog post.

```

export ENVIRONMENT=dev
export ACCOUNT=development
export REGION=us-east-1
export DOMAIN=product
export STAGE=dev
export AWS_ACCESS_KEY_ID=xxxxxx
export AWS_SECRET_ACCESS_KEY=xxxx
cdk bootstrap aws://851725294709/us-east-1
cdk synth
cdk deploy --all
```
