## Install LocalStack and start LocalStack

```sh
brew install localstack/tap/localstack-cli
docker create network localstack
localstack start
```

```sh
aws s3 ls --endpoint-url http://0.0.0.0:4566
```

## Create mock s3 buckets

```sh
aws s3 mb s3://my-first-bucket --endpoint-url http://0.0.0.0:4566
aws s3 mb s3://my-second-bucket --endpoint-url http://0.0.0.0:4566
aws s3 mb s3://my-third-bucket --endpoint-url http://0.0.0.0:4566
```

## Set an env var endpoint just for a service

```sh
export AWS_ENDPOINT_URL_S3="http://0.0.0.0:4566"
env | grep AWS_ENDPOINT_URL_S3
```
