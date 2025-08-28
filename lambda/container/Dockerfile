# Use AWS python base image
FROM public.ecr.aws/lambda/python:3.12

# Copy over function specific code
COPY function/function.py /var/task/

# Install dependencies
RUN pip install -r requirements.txt

CMD ["function.handler"]
