# AWS CloudTrail Configuration

## Create CloudWatch Logs Log Group

aws logs create-log-group \
--log-group-name my-cloudtrail-log-group

## Create CloudWatch Logs Log Stream

aws logs create-log-stream \
--log-group-name my-cloudtrail-log-group \
--log-stream-name my-cloudtrail-log-stream

## Updating CloudTrail with CloudWatch Logs Integration

> The following command updates an existing CloudTrail to send log events to Amazon CloudWatch Logs:

aws cloudtrail update-trail \
--name my-trail \
--cloud-watch-logs-log-group-arn arn:aws:logs:us-east-1:123456789012:log-group:my-cloudtrail-log-group \
--cloud-watch-logs-role-arn arn:aws:iam::123456789012:role/my-cloudtrail-role
