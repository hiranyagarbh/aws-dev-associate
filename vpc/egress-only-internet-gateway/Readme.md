## Create VPC

```sh
aws ec2 create-vpc --cidr-block 10.0.0.0/16 --amazon-provided-ipv6-cidr-block
```

## Create a Subnet

```sh
aws ec2 create-subnet \
--vpc-id <vpc-id> \
--ipv6-cidr-block <ipv6-cidr-block> \
--cidr-block 10.0.0.0/24
```

## Enable DNS64

> allows NAT to translate IPv4 addresses to IPv6 addresses

```sh
aws ec2 modify-subnet-attribute \
--subnet-id <subnet-id> \
--enable-dns64
```

## Create an Egress-Only Internet Gateway

```sh
aws ec2 create-egress-only-internet-gateway \
--vpc-id <vpc-id>
```

## Create an Internet Gateway

```sh
aws ec2 create-internet-gateway
```

## Attach Internet Gateway to VPC

```sh
aws ec2 attach-internet-gateway \
--internet-gateway-id <internet-gateway-id> \
--vpc-id <vpc-id>
```

## Allocate Elastic IP Address

```sh
aws ec2 allocate-address
```

## Create a NAT Gateway

```sh

aws ec2 create-nat-gateway \
--subnet-id <subnet-id> \
--allocation-id <allocation-id>
```

## Create a Route Table

```sh
aws ec2 create-route-table \
--vpc-id <vpc-id>
```

## Create a Route

```sh
aws ec2 create-route \
--route-table-id <route-table-id> \
--destination-ipv6-cidr-block ::/0 \
--egress-only-internet-gateway-id <egress-only-internet-gateway-id>
```

## Create IPv4 outboud route to use NAT

```sh
aws ec2 create-route \
--route-table-id <route-table-id> \
--destination-ipv6-cidr-block 64:ff9b::/96 \
--nat-gateway-id <nat-gateway-id>
```

## Teardown

## Detach Internet Gateway from VPC

```sh
aws ec2 detach-internet-gateway \
--internet-gateway-id <internet-gateway-id> \
--vpc-id <vpc-id>
```

## Delete Internet Gateway

```sh
aws ec2 delete-internet-gateway \
--internet-gateway-id <internet-gateway-id>
```

## Delete Egress-Only Internet Gateway

```sh
aws ec2 delete-egress-only-internet-gateway \
--egress-only-internet-gateway-id <egress-only-internet-gateway-id>
```

## Delete NAT Gateway

```sh
aws ec2 delete-nat-gateway \
--nat-gateway-id <nat-gateway-id>
```

## Delete Route Table

```sh
aws ec2 delete-route-table \
--route-table-id <route-table-id>
```

## Delete Subnet

```sh
aws ec2 delete-subnet \
--subnet-id <subnet-id>
```

## Delete VPC

```sh
aws ec2 delete-vpc \
--vpc-id <vpc-id>
```

## Delete Elastic IP Address

```sh
aws ec2 release-address \
--allocation-id <allocation-id>
```
