## Create a bucket

```sh
aws s3api create-bucket --bucket my-cors-bucket012 --region us-east-1
```

## Change block public access

```sh
aws s3api put-public-access-block \
--bucket my-cors-bucket012 \
--public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=false,RestrictPublicBuckets=false"
```

## Create a bucket policy

```sh
aws s3api put-bucket-policy \
--bucket my-cors-bucket012 \
--policy file://policy.json
```

## Turn on static website hosting

```sh
aws s3api put-bucket-website \
--bucket my-cors-bucket012 \
--website-configuration file://website.json
```

## Upload index.html file & include a cross-origin resource

```sh
aws s3api put-object \
--bucket my-cors-bucket012 \
--key index.html \
--body index.html \
--content-type text/html \
--website-redirect-location /index.html
```

```sh
aws s3api put-object \
--bucket my-cors-bucket012 \
--key error.html \
--body error.html \
--content-type text/html \
--website-redirect-location /error.html
```

## Get bucket website object URL

> https://{bucket-name}.s3.us-east-1.amazonaws.com/index.html

> https://{bucket-name}.s3.us-east-1.amazonaws.com/error.html

```sh
aws s3api get-bucket-website \
--bucket my-cors-bucket012 \
--query 'WebsiteConfiguration.RedirectAllRequestsTo.HostName' \
--output text
```

## Apply a CORS policy

```sh
aws s3api put-bucket-cors \
--bucket my-cors-bucket012 \
--cors-configuration file://cors.json
```

## Cleanup

```sh
aws s3api delete-object \
--bucket my-cors-bucket012 \
--key index.html

aws s3api delete-object \
--bucket my-cors-bucket012 \
--key error.html

aws s3api delete-bucket \
--bucket my-cors-bucket012 \
--region us-east-1
```
