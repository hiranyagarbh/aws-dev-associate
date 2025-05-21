## Install Requirements

```sh
cd app/
pip install -r requirements.txt
```

## Run without container

```sh
python main.py
```
This should start the application on port '5000'.

## Test the endpoint for localapp
```sh
curl "http://localhost:5000/api/hello"
curl "http://localhost:5000/api/hello?name=Hiranyagarbh+Singh"
```

## Build Image

```sh
docker build -t app ./app
```

## Run with container

```sh
docker run --rm -p 4567:4567 -it app
```

## Test the endpoint for local container app
```sh
curl "http://localhost:4567/api/hello"
curl "http://localhost:4567/api/hello?name=Hiranyagarbh+Singh"
```

## Create ECR Repository

aws ecr create-repository \
--repository-name python \
--image-tag-mutability IMMUTABLE

aws ecr create-repository \
--repository-name app \
--image-tag-mutability MUTABLE

## Login to ECR

```sh
aws ecr get-login-password --region us-east-1 | docker login \
--username AWS \
--password-stdin 820242917077.dkr.ecr.us-east-1.amazonaws.com
```

## Pull, Tag and Push Python Image

```sh
docker pull python:3.14.0b1-slim-bookworm
```

```sh
docker build -t python .
docker tag python:3.14.0b1-slim-bookworm 820242917077.dkr.ecr.us-east-1.amazonaws.com/python:3.14.0b1-slim-bookworm
```

```sh
docker push 820242917077.dkr.ecr.us-east-1.amazonaws.com/python:3.14.0b1-slim-bookworm
```
### Build, tag and push app container

> Update the Dockerfile to reference our python image in ECR

```sh
docker build -t app ./app
docker tag app:latest 820242917077.dkr.ecr.us-east-1.amazonaws.com/app:latest
docker push 820242917077.dkr.ecr.us-east-1.amazonaws.com/app:latest
```
