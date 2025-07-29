## Create two buckets

```sh
aws s3 mb s3://server-logs-source-1212
aws s3 mb s3://server-logs-destination-1212/logs
```

> Create a logs folder

```sh
aws s3api put-object \
--bucket server-logs-destination-1212 \
--key logs/
```

> Put bucket policy

```sh
# Apply the policy to the destination bucket
aws s3api put-bucket-policy \
--bucket server-logs-destination-1212 \
--policy file://policy.json

# Configure logging on the source bucket
aws s3api put-bucket-logging \
--bucket server-logs-source-1212 \
--bucket-logging-status '{
  "LoggingEnabled": {
    "TargetBucket": "server-logs-destination-1212",
    "TargetPrefix": "logs/"
  }
}'
```

## Source data

```sh
echo "Hello World" > hello.txt
aws s3 cp hello.txt s3://server-logs-source-1212/hello.txt
```

## Download/sync access logs

```sh
mkdir logs
aws s3 sync s3://server-logs-destination-1212/logs/ logs/
```

## Cleanup

```sh
aws s3 rm s3://server-logs-source-1212/hello.txt
aws s3 rb s3://server-logs-source-1212
aws s3 rm --recursive s3://server-logs-destination-1212/logs
aws s3 rb s3://server-logs-destination-1212
```
