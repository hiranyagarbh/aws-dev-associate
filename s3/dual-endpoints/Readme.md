## Create a bucket

```sh
aws s3 mb s3://endpoint-bucket-2323
```

## Upload a file to S3 using standard endpoint

> https://docs.aws.amazon.com/general/latest/gr/s3.html

```sh
touch standard.txt
aws s3 cp standard.txt s3://endpoint-bucket-2323/standard.txt \
--endpoint-url https://s3.us-east-1.amazonaws.com
```

## Upload a file to S3 using dual endpoint

```sh
touch dual.txt
aws s3 cp dual.txt s3://endpoint-bucket-2323/dual.txt \
--endpoint-url https://s3.dualstack.us-east-1.amazonaws.com
```

# Cleanup

```sh
aws s3 rm s3://endpoint-bucket-2323/standard.txt
aws s3 rm s3://endpoint-bucket-2323/dual.txt
aws s3 rb s3://endpoint-bucket-2323
```
