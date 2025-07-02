## Create a new S3 bucket

```sh
aws s3api create-bucket --bucket acl-example-hg-1212 --region us-east-1
```

## Turn off Block Public Access for ACLs

```sh
aws s3api put-public-access-block \
--bucket acl-example-hg-1212 \
--public-access-block-configuration '{"BlockPublicAcls":false,"IgnorePublicAcls":false,"BlockPublicPolicy":true,"RestrictPublicBuckets":true}'
```

## Get Public Access Block Configuration

```sh
aws s3api get-public-access-block \
--bucket acl-example-hg-1212
```

## Change Bucket Ownership Controls

```sh
aws s3api put-bucket-ownership-controls \
--bucket acl-example-hg-1212 \
--ownership-controls '{"Rules":[{"ObjectOwnership":"BucketOwnerPreferred"}]}'
```

> Note : To find the canonical user ID using the AWS CLI
> https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-identifiers.html

```sh
aws s3api list-buckets \
    --query Owner.ID \
    --output text
```

## Add ACL Grants

```sh
aws s3api put-bucket-acl \
--bucket acl-example-hg-1212 \
--access-control-policy file://acl.json
```

## Cleanup

```sh
aws s3api delete-bucket \
--bucket acl-example-hg-1212
```
