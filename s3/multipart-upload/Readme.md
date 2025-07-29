## Create a large file

```sh
dd if=/dev/zero of=largefile.txt bs=1M count=50
ls -lah | grep largefile.txt
```

## Create a new bucket

```sh
echo BUCKET_NAME="multipart-upload-1212"
aws s3 mb s3://multipart-upload-1212
```

## Initiate

```sh
aws s3api create-multipart-upload --bucket $BUCKET_NAME --key largefile.txt
# remember to get the upload id from the output
```

> List multipart uploads

```sh
aws s3api list-multipart-uploads --bucket multipart-upload-1212 --query 'Uploads[*].{Key:Key, UploadId:UploadId}'
```

## Split the files into 5 parts

```sh
split -b 10M largefile.txt part_
```

## Upload the parts

```sh
# store upload id as env variable

export UPLOAD_ID="B5Lz74fscEMO_b7tl8fKmKjMw0Ype876JBa67rwBnN0uiwtVLQemeym5YyyCgWm8fAmTGKuSqvLfXMBL88YWWZMQh6AbN4uYwRFmgqi0zDnG9FA0Z8JB64lcSGWoCgUM"

# upload parts

aws s3api upload-part --bucket $BUCKET_NAME \
--key largefile.txt --part-number 1 --upload-id  $UPLOAD_ID --body part_aa

aws s3api upload-part --bucket $BUCKET_NAME \
--key largefile.txt --part-number 2 --upload-id $UPLOAD_ID --body part_ab

aws s3api upload-part --bucket $BUCKET_NAME \
--key largefile.txt --part-number 3 --upload-id $UPLOAD_ID --body part_ac

aws s3api upload-part --bucket $BUCKET_NAME \
--key largefile.txt --part-number 4 --upload-id $UPLOAD_ID --body part_ad

aws s3api upload-part --bucket $BUCKET_NAME \
--key largefile.txt --part-number 5 --upload-id $UPLOAD_ID --body part_ae

# get all hte parts with their etags

aws s3api list-parts --bucket $BUCKET_NAME \
--key largefile.txt --upload-id $UPLOAD_ID

# store all partnumber and etag in a correctly formatted JSON directly

aws s3api list-parts --bucket $BUCKET_NAME \
--key largefile.txt --upload-id $UPLOAD_ID \
--query '{Parts: Parts[].{PartNumber:PartNumber,ETag:ETag}}' \
--output json > multipart-upload.json

# Then complete the upload
aws s3api complete-multipart-upload \
--bucket $BUCKET_NAME \
--key largefile.txt \
--upload-id $UPLOAD_ID \
--multipart-upload file://multipart-upload.json
```

## Finish

```sh
aws s3api list-objects --bucket $BUCKET_NAME --query 'Contents[*].{Key:Key, Size:Size}'
```

## Cleanup

```sh
aws s3api delete-object \
--bucket $BUCKET_NAME \
--key largefile.txt

aws s3 rb s3://multipart-upload-1212
```
