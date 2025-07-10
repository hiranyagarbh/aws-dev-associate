# Create a bucket without versioning

```sh
aws s3 mb s3://ver-bucket-1212 --region us-east-1
```

# Create and copy unversioned file/object to S3

```sh
echo "hello world!" > file.txt
aws s3 cp file.txt s3://ver-bucket-1212

# contents of s3 without    versioning info
aws s3 ls s3://ver-bucket-1212

# more detailed information about the objects in the bucket without versioning info
aws s3api list-objects --bucket ver-bucket-1212
```

# Get object versions

```sh
aws s3api list-object-versions --bucket ver-bucket-1212 --prefix file.txt
# make note of the versionId is "null"
```

# Create a bucket with versioning

```sh
aws s3api put-bucket-versioning \
--bucket ver-bucket-1212 \
--versioning-configuration Status=Enabled
```

# Confirm versioning is enabled

```sh
aws s3api get-bucket-versioning --bucket ver-bucket-1212

# expected output:
# {
#     "Status": "Enabled"
# }
```
