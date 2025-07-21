## Create a bucket

```sh
aws s3api create-bucket \
--bucket glacier-bucket-1212 \
--region us-east-1
```

## Create a file and add to S3 GLACIER

```sh
echo "hello world" > hello.txt

aws s3 cp hello.txt s3://glacier-bucket-1212 \
--storage-class GLACIER
```

## Restore object

> Accessing the object in GLACIER Flexible Retrieval storage class, without restoring the object, is not possible.

```sh
aws s3api restore-object \
--bucket glacier-bucket-1212 \
--key hello.txt \
--restore-request Days=1
```

## Cleanup

```sh
aws s3 rm s3://glacier-bucket-1212 --recursive

aws s3api delete-bucket \
--bucket glacier-bucket-1212 \
--region us-east-1
```
