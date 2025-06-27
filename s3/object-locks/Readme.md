## Create a new folder

```sh
aws s3 mb s3://my-object-lock-2323
```

## Turn on / Put bucket versioning

```sh
aws s3api put-bucket-versioning \
--bucket my-object-lock-2323 \
--versioning-configuration Status=Enabled
```

## Turn on / Put object lock configuration

```sh
aws s3api put-object-lock-configuration \
--bucket my-object-lock-2323 \
--object-lock-configuration '{"ObjectLockEnabled": "Enabled", "Rule": {"DefaultRetention": {"Mode": "GOVERNANCE", "Days": 1}}}'
```

## New file

```sh
echo "This is a new file" > example.txt
aws s3 cp example.txt s3://my-object-lock-2323/
```

## Remove file

```sh
aws s3 rm s3://my-object-lock-2323/example.txt
```

## List object versions

```sh
aws s3api list-object-versions --bucket my-object-lock-2323
```

## Delete the versioned object

```sh
aws s3api delete-object \
--bucket my-object-lock-2323 \
--key example.txt \
--version-id <version-id> --bypass-governance-retention
```

## Cleanup

```sh
aws s3 rb s3://my-object-lock-2323
```
