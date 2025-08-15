## Allocate Elastic IP Address

```sh
aws ec2 allocate-address \
--domain vpc
```

## Associate Elastic IP Address

```sh
aws ec2 associate-address \
--allocation-id <allocation-id> \
--instance-id <instance-id>
```

## Disassociate Elastic IP Address

```sh
aws ec2 disassociate-address \
--association-id <association-id>
```

## Release Elastic IP Address

```sh
aws ec2 release-address \
--allocation-id <allocation-id>
```

## Reassociation

```sh
aws ec2 associate-address \
--allocation-id <allocation-id> \
--instance-id <instance-id> \
--allow-reassociation
```

## Recover specific Elastic IP Address (if available)

```sh
aws ec2 allocate-address \
--domain vpc \
--address <elastic-ip-address>
```

## Custom IPV4 Address

```sh
aws ec2 allocate-address \
--domain vpc \
--public-ipv4-pool <ipv4-pool-id>
```
