### Set a CloudFormation stack policy to prevent updates to specific resources

> This policy will deny all update actions on the MyEC2Instance resource.

```sh
aws cloudformation set-stack-policy \
 --stack-name prevent-stack-update \
 --stack-policy-body '{"Statement":[{
 "Effect":"Deny",
 "Action":"Update:*",
 "Principal":"*",
 "Resource":"LogicalResourceId/MyEC2Instance"
 }]}'
```
