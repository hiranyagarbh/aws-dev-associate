## Create a Bucket

```sh
aws s3 mb s3://step-funct-1212 --region us-east-1
```

## Enable EventBridge configuration

```sh
aws s3api put-bucket-notification-configuration \
--region us-east-1 \
--bucket step-funct-1212 \
--notification-configuration '{"EventBridgeConfiguration": {}}'
```
