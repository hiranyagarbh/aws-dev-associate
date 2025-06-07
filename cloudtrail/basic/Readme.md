## Create a bucket for CloudTrail Logs

```sh
aws s3 mb s3://my-cloudtrail-ab-1212
```

## Create a trail

```sh
aws cloudtrail create-trail \
--name my-trail \
--s3-bucket-name my-cloudtrail-ab-1212 \
--region us-east-1
```

## Create a bucket policy to allow CloudTrail to write logs

```sh
aws s3api put-bucket-policy \
--bucket my-cloudtrail-ab-1212 \
--policy file://cloudtrail/bucket-policy.json
```

## Start logging

```sh
aws cloudtrail start-logging \
--name my-trail
```
