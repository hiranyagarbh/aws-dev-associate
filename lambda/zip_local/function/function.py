import json
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def handler(event, context):
    """
    AWS Lambda handler function
    """
    try:
        first_name = event.get('first_name', 'Anonymous')
        last_name = event.get('last_name', 'User')

        message = f'Hello {first_name} {last_name}'

        # funct metadata
        info = {
            "type": "Zip Inline",
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
