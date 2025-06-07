# AWS CloudTrail Configuration

## Create CloudWatch Logs Log Group

```sh
aws logs create-log-group \
--log-group-name my-cloudtrail-log-group
```

## Create CloudWatch Logs Log Stream

```sh
aws logs create-log-stream \
--log-group-name my-cloudtrail-log-group \
--log-stream-name my-cloudtrail-log-stream
```

## Updating CloudTrail with CloudWatch Logs Integration

> The following command updates an existing CloudTrail to send log events to Amazon CloudWatch Logs:

```sh
aws cloudtrail update-trail \
--name my-trail \
--cloud-watch-logs-log-group-arn arn:aws:logs:us-east-1:123456789012:log-group:my-cloudtrail-log-group \
--cloud-watch-logs-role-arn arn:aws:iam::123456789012:role/my-cloudtrail-role
```

## Create my-cloudtrail-role

```sh
aws iam create-role \
--role-name my-cloudtrail-role \
--assume-role-policy-document file://trust-policy.json
```

## Create my-cloudtrail-policy

```sh
aws iam create-policy \
--policy-name my-cloudtrail-policy \
--policy-document file://policy.json
```

## Attach my-cloudtrail-policy to my-cloudtrail-role

```sh
aws iam attach-role-policy \
--role-name my-cloudtrail-role \
--policy-arn arn:aws:iam::123456789012:policy/my-cloudtrail-policy
```
