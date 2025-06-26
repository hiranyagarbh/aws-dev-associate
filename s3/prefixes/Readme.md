## Make S3 bucket

```sh
aws s3api create-bucket --bucket my-prefixes-1212 --region us-east-1
```

## Make folders

> Key Limit is 1024 bytes

```sh
aws s3api put-object --bucket my-prefixes-1212 --key folder1/
aws s3api put-object --bucket my-prefixes-1212 --key folder2/
```

## List objects

```sh
aws s3api list-objects --bucket my-prefixes-1212
aws s3api list-objects --bucket my-prefixes-1212 --prefix "" --delimiter "/"
```
