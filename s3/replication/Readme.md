## Create a new S3 Bucket

```sh
aws s3api create-bucket --bucket rep-bucket-hg-2323 --region us-east-1
aws s3api create-bucket --bucket rep-bucket-hg-5656 --region us-east-1
```

## Turn on Bucket versioning

```sh
aws s3api put-bucket-versioning \
--bucket rep-bucket-hg-2323 \
--versioning-configuration Status=Enabled

aws s3api put-bucket-versioning \
--bucket rep-bucket-hg-5656 \
--versioning-configuration Status=Enabled
```

## Turn on replication

```sh
aws s3api put-bucket-replication \
--bucket rep-bucket-hg-2323 \
--replication-configuration file://replication.json
```

## Create a role and policy for s3 replication

```sh
aws iam create-role \
--role-name s3-replication-role \
--assume-role-policy-document file://trust-policy.json

aws iam put-role-policy \
--role-name s3-replication-role \
--policy-name s3-replication-policy \
--policy-document file://policy.json
```
