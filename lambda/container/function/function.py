import json
import logging
from faker import Faker

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def handler(event, context):
    """
    AWS Lambda handler function
    """
    fake = Faker()

    try:
        fake_name = event.get('name', fake.name())

        message = f'Hello {fake_name}'

        # funct metadata
        info = {
            "type": "Container example",
            "version": "1.0",
            "request_id": context.aws_request_id if context else "local"
        }

        # log the info
        logger.info(json.dumps(info))

        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': message,
                'info': info
            })
        }

    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': 'Internal server error'
            })
        }
