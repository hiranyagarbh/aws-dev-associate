> MemoryDB instance can only be accessed from within the VPC.

## Create Subnet Group

```sh
aws memorydb create-subnet-group \
--subnet-group-name subnet-group-1212 \
--description "Subnet group for memorydb cluster" \
--subnet-ids subnet-23456789 subnet-34567890 subnet-45678901 subnet-56789012
```

## Create a user

```sh
aws memorydb create-user \
--user-name user1 \
--access-string "on ~* +x" \
--authentications "type=PASSWORD,password=secret"
```

## Create ACL

```sh
aws memorydb create-acl \
--acl-name my-acl-1212 \
--user-names user1
```

## Create a cluster

```sh
aws memorydb create-cluster \
cluster-name memorydb-cluster-1212 \
--node-type db.t4g.small \
--subnet-group-name subnet-group-1212 \
--acl-name my-acl-1212 \
--security-group-ids sg-12345678
```

## Cleanup

```sh
aws memorydb delete-cluster \
cluster-name memorydb-cluster-1212 \
--force-delete

aws memorydb delete-acl \
acl-name my-acl-1212

aws memorydb delete-user \
user-name user1

aws memorydb delete-subnet-group \
subnet-group-name subnet-group-1212
```
