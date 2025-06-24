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

### list-buckets

Lists all S3 buckets in table format with name, creation date, and region.

```bash
./list-buckets
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

### delete-object

Deletes a specific object from an S3 bucket.

```bash
./delete-object <bucket-name> <object-key>
```

### empty-bucket

Empties all objects from an S3 bucket with confirmation prompt.

```bash
./empty-bucket <bucket-name>
```

### get-bucket-info

Shows detailed bucket information including region, versioning, encryption, and statistics.

```bash
./get-bucket-info <bucket-name>
```

### sync

Syncs between local directory and S3.

```bash
./sync <source> <destination>
```
