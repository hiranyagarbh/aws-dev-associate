## Create a bucket without versioning

```sh
aws s3 mb s3://ver-bucket-1212 --region us-east-1
```

## Create and copy unversioned file/object to S3

```sh
echo "hello world!" > file.txt
aws s3 cp file.txt s3://ver-bucket-1212

# contents of s3 without    versioning info
aws s3 ls s3://ver-bucket-1212

# more detailed information about the objects in the bucket without versioning info
aws s3api list-objects --bucket ver-bucket-1212
```

## Get object versions

```sh
aws s3api list-object-versions --bucket ver-bucket-1212 --prefix file.txt
# make note of the versionId is "null"
```

## Create a bucket with versioning

```sh
aws s3api put-bucket-versioning \
--bucket ver-bucket-1212 \
--versioning-configuration Status=Enabled
```

## Confirm versioning is enabled

```sh
aws s3api get-bucket-versioning --bucket ver-bucket-1212

# expected output:
# {
#     "Status": "Enabled"
# }
```

## Update the object in order to apply versioning

```sh
echo "hello world 2!" > file.txt
cat file.txt
aws s3 cp file.txt s3://ver-bucket-1212

# Get object versions
aws s3api list-object-versions --bucket ver-bucket-1212 --prefix file.txt
# output: notice versionId is now populated - 2 verions - other being null
```

## Update object again

```sh
echo "hello world 3!" > file.txt
cat file.txt
aws s3 cp file.txt s3://ver-bucket-1212

# get object versions
aws s3api list-object-versions \
--bucket ver-bucket-1212 \
--prefix file.txt \
--query 'Versions[*].{VersionId:VersionId,LastModified:LastModified}' \
--output table
```

## Get object contents

```sh
aws s3 cp s3://ver-bucket-1212/file.txt - | cat
```

## Get object contents including latest versionId

```sh
aws s3api get-object \
--bucket ver-bucket-1212 \
--key file.txt /dev/stdout | cat
```

## delete object without specifying versionId

```sh
aws s3api delete-object \
--bucket ver-bucket-1212 \
--key file.txt

# check delete markers
aws s3api list-object-versions \
--bucket ver-bucket-1212 \
--prefix file.txt \
--query 'DeleteMarkers[*].{VersionId:VersionId,LastModified:LastModified}' \
--output table
```

## get deleted object contents and details with versionId

```sh
aws s3api get-object \
--bucket ver-bucket-1212 \
--version-id HUluuazFw4CR0W4qzT5_Ubzpj1l0OEUl \
--key file.txt /dev/stdout | cat
```
