## Create a new bucket

```sh
aws s3 mb s3://object-tags-1212
```

## Create and upload a file

```sh
echo "Hello, World!" > hello.txt
aws s3 cp hello.txt s3://object-tags-1212/hello.txt
```

## Apply object tagging

```sh
aws s3api put-object-tagging \
--bucket object-tags-1212 \
--key hello.txt \
--tagging 'TagSet=[{Key=Name,Value=Hello}]'
```

## Cleanup

```sh
aws s3 rm s3://object-tags-1212/hello.txt
aws s3 rb s3://object-tags-1212
```
