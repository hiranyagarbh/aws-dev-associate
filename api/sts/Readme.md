## Create a user with no permissions

> create a user with no permissions and generate an access key

```sh
aws iam create-user --user-name sts-machine-user
aws iam create-access-key --user-name sts-machine-user --output table
```

> configure aws cli with the created access key and test get-caller-identity

```sh
aws configure
aws sts get-caller-identity --output table
```

## Create a role

> create a role that will access the resources

> Put user policy to assume role

```sh
aws iam put-user-policy \
--user-name sts-machine-user \
--policy-name sts-machine-user-policy \
--policy-document file://sts-machine-user-policy.json
```

## Use new user credentials and assume role

```sh
aws sts assume-role \
--role-arn arn:aws:iam::123456789012:role/sts-stack-StsRole \
--role-session-name sts-s3-session
```

## Create a bucket

```sh
aws s3 mb s3://sts-bucket-1212
```
