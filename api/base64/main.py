# This module provides functions for encoding and decoding data using Base64 encoding.

# Import necessary modules
import base64

data = b'Hello, World!'

# Define functions for encoding and decoding data
def encode(data):
    return base64.b64encode(data).decode('utf-8')

def decode(data):
    return base64.b64decode(data)

# Print encoded and decoded data
print(f"Encoded: {encode(data)}")
print(f"Decoded: {decode(encode(data))}")
