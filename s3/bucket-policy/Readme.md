## Create a Bucket

```sh
aws s3api create-bucket --bucket bucket-policy-example-2323 --region us-east-1
```

## Create a Bucket Policy

```sh
aws s3api put-bucket-policy \
--bucket bucket-policy-example-2323 \
--policy file://policy.json
```

## Check cross account bucket access

```sh
aws s3 ls bucket-policy-example-2323
```

## Cleanup

```sh
aws s3api delete-bucket-policy --bucket bucket-policy-example-2323
aws s3api delete-bucket --bucket bucket-policy-example-2323
```
