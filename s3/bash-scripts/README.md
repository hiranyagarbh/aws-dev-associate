# S3 Bash Scripts

Collection of bash scripts for AWS S3 operations.

### create-bucket

Creates a new S3 bucket.

```bash
./create-bucket <bucket-name>
```

### delete-bucket

Deletes an S3 bucket (empties it first).

```bash
./delete-bucket <bucket-name>
```

### list-objects

Lists all objects in a bucket.

```bash
./list-objects <bucket-name>
```

### put-object

Creates and uploads 1-10 random files to S3.

```bash
./put-object <bucket-name>
```

### sync

Syncs between local directory and S3.

```bash
./sync <source> <destination>
```
