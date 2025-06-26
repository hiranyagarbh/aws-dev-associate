## Create Bucket

```sh
aws s3api create-bucket --bucket my-metadata-1212 --region us-east-1
```

## Create a new file

```sh
echo "Hello, World!" > hello.txt
```

## Upload file with metadata

> User defined

```sh
aws s3api put-object \
--bucket my-metadata-1212 \
--key hello.txt \
--body hello.txt \
--metadata "author=Hiranyagarbh" \
--content-type "text/plain"
```

## Get Object Metadata

```sh
aws s3api head-object \
--bucket my-metadata-1212 \
--key hello.txt
```
