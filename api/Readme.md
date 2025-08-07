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

## Wait for EC2 instance to be ready

```sh
aws ec2 wait instance-status-ok \
--instance-ids i-0123456789abcdef0
```

## AWS CLI Aliases

aliases.txt:

```sh
[toplevel]
describesubnets = ec2 describe-subnets --filters Name=state, Values=available --query 'Subnets[*].{ID:SubnetId,Name:Tags[?Key==`Name`].Value|[0],State:State} --output table'
```

```sh
cp aliases.txt ~/.aws/aliases
cat ~/.aws/aliases

# test created alias
aws describesubnets
```

## Filters

> minimize the data to be returned

```sh
aws ec2 describe-subnets \
--region us-east-1 \
--filters Name=availability-zone,Values=us-east-1a \
--query 'Subnets[*].{ID:SubnetId}' \
--output table
```
