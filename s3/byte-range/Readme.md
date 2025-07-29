## Create a bucket

```sh
aws s3 mb s3://byte-range-1212
```

## Make and Upload a file

```sh
echo "hello world" > hello.txt
aws s3 cp hello.txt s3://byte-range-1212/hello.txt
```

## Gen an object range

```sh
aws s3api get-object \
--bucket byte-range-1212 \
--key hello.txt \
--range bytes=0-4 range.txt

# gets the world hello
```

## Cleanup

```sh
aws s3 rm s3://byte-range-1212/hello.txt
aws s3 rb s3://byte-range-1212
```
