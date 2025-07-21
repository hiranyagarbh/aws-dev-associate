## Create a new bucket

```sh
aws s3api create-bucket --bucket lifecycle-bucket-1212 --region us-east-1
```

## Create a new lifecycle configuration

```sh
aws s3api put-bucket-lifecycle-configuration \
--bucket lifecycle-bucket-1212 \
--region us-east-1 \
--lifecycle-configuration file://lifecycle.json
```

## Cleanup

```sh
aws s3api delete-bucket --bucket lifecycle-bucket-1212 --region us-east-1
```
