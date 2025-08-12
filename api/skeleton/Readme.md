## Generate out skeleton for EC2

```sh
aws ec2 run-instances --generate-cli-skeleton > skeleton.json
```

## Load JSON skeleton

```sh
aws ec2 run-instances --cli-input-json file://skeleton.json
```
