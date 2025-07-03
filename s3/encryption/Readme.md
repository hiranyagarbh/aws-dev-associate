## Create a bucket

```sh
aws s3api create-bucket --bucket my-encryption-bucket-2323 --region us-east-1
```

## Create an object and put object with encryption SSE-S3

```sh
echo "Hello, World!" > my-file.txt

aws s3api put-object \
--bucket my-encryption-bucket-2323 \
--key my-object \
--body my-file.txt
```

## Put object with encryption of SS3-KMS

```sh
aws s3api put-object \
--bucket my-encryption-bucket-2323 \
--key my-object \
--body my-file.txt \
--server-side-encryption aws:kms \
--ssekms-key-id '12345678-1234-1234-1234-123456789012'
```

> Note: List or Create AWS KMS keys ($1 per month)

```sh
aws kms list-keys
aws kms create-key
```

# Put obkect with encryption SSE-C

> Generate a base64 and md5 key

```sh
export BASE64_ENCODED_KEY=$(openssl rand -base64 32)
echo $BASE64_ENCODED_KEY

export ENCODED_KEY_MD5=$(echo -n $BASE64_ENCODED_KEY | base64 --decode | md5sum | awk '{print $1}' | base64 -w0)

```

```sh
aws s3api put-object \
--bucket my-encryption-bucket-2323 \
--key my-object \
--body my-file.txt \
--sse-customer-algorithm AES256 \
--sse-customer-key $BASE64_ENCODED_KEY \
--sse-customer-key-md5 $ENCODED_KEY_MD5
```
