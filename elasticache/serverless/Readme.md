## Create serverless chache

```sh
aws elasticache create-serverless-cache \
--serverless-cache-name serverless-cache-1212 \
--engine redis \
--major-engine-version 7
```

## Connect to Redis (only via EC2 instance under same VPC)

```sh
redis-cli --tls -h <endpoint> -p <port>
```
