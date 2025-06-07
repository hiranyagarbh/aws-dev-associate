# Create a bucket for CloudTrail Logs

aws s3 mb s3://my-cloudtrail-ab-1212

# Create a trail

aws cloudtrail create-trail \
--name my-trail \
--s3-bucket-name my-cloudtrail-ab-1212 \
--region us-east-1

# Create a bucket policy to allow CloudTrail to write logs

aws s3api put-bucket-policy \
--bucket my-cloudtrail-ab-1212 \
--policy file://cloudtrail/bucket-policy.json
