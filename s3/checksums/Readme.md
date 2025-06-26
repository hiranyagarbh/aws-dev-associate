## Create new S3 bucket

```sh
aws s3 mb s3://my-checksum-1212
```

## Create a file that will we do a checksum on

```sh
echo "Hello World" > hello.txt
```

## Get a checksum of a file for MD5 (on macOS)

```sh
md5 hello.txt
```

> just the checksum hash

```sh
md5 -q hello.txt
```

## Upload file to S3 bucket and get etag

```sh
aws s3 cp hello.txt s3://my-checksum-1212/
aws s3api head-object --bucket my-checksum-1212 --key hello.txt
```

## Upload a file with different checksum algorithm

> CRC32

```sh
aws s3api put-object --bucket my-checksum-1212 --key hello.txt --body hello.txt --checksum-algorithm CRC32
```

> SHA256

```sh
aws s3api put-object --bucket my-checksum-1212 --key hello.txt --body hello.txt --checksum-algorithm SHA256
```
