## Install Docker

```sh
docker run --rm -it amazon/aws-cli --version
```

## List s3 buckets

```sh
# requires aws credentials in docker container
aws configure
docker run --rm -it amazon/aws-cli s3 ls
```

## Connect with credentials

```sh
docker run --rm -it \
-v ~/.aws:/root/.aws:ro \
public.ecr.aws/aws-cli \
s3 ls
```

## Cleanup (remove images)

```sh
docker rmi amazon/aws-cli
docker rmi public.ecr.aws/aws-cli
```
