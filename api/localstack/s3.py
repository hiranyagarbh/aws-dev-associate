# Create an S3 client with a custom endpoint

import boto3

# Connect to the S3 service - localstack
s3_client = boto3.client('s3', endpoint_url='http://0.0.0.0:4566')

# Create a bucket
s3_client.create_bucket(Bucket='my-fourth-bucket')

# List buckets
response = s3_client.list_buckets()
print(response)


# Create and Upload an object to the bucket
print('Creating and uploading object...')
with open("my-file.txt", "w") as f:
    f.write("hello world\n")
s3_client.put_object(Bucket='my-fourth-bucket', Key='my-file.txt', Body='hello world')

# List objects in a bucket
response = s3_client.list_objects_v2(Bucket='my-fourth-bucket')
print(response)

# Download an object from the bucket
response = s3_client.get_object(Bucket='my-fourth-bucket', Key='my-file.txt')
print(response['Body'].read().decode('utf-8'))

# Delete an object from the bucket
s3_client.delete_object(Bucket='my-fourth-bucket', Key='my-file.txt')
