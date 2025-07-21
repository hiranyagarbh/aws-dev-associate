> Note: Batch operations can only be executed via AWS CLI.

## Create a new bucket

```sh
aws s3api create-bucket \
--bucket batch-operation-bucket-1212 \
--region us-east-1 \
```

### Create 20 different files between 100 and 1000 bytes in a directory

```sh
#!/bin/bash

# Create a directory to store the files
mkdir -p files

# Generate 20 files with random sizes between 100 and 1000 bytes
for i in {1..20}; do
  size=$((RANDOM % 901 + 100))
  dd if=/dev/urandom of=files/file$i bs=1 count=$size
done
```

## Sync created files

```sh
aws s3 sync files s3://batch-operation-bucket-1212
```
