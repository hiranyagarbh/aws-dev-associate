## Wizard Commands - to generate AWS CLI commands or policy documents

```sh
aws configure wizard
aws dynamodb wizard new-table
aws events wizard new-rule
aws iam wizard new-user
aws lambda wizard new-function
```

> --output (json, table, text, yaml, yaml-stream) and --query flags

```sh
aws ec2 describe-vpcs \
--output table \
--query 'Vpcs[*].{ID:VpcId,Name:Tags[?Key==`Name`].Value|[0],State:State}'
```
