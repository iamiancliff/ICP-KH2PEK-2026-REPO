import json
from datetime import datetime

def lambda_handler(event, context):
    method = event.get("requestContext", {}).get("http", {}).get("method", "UNKNOWN")

    body = None
    if event.get("body"):
        try:
            body = json.loads(event["body"])
        except json.JSONDecodeError:
            body = None

    response = {
        "message": "Hello Guest, welcome to my serverless API 👋",
        "method": method,
        "note": body.get("note") if body else None,
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "service": "AWS Lambda"
    }

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps(response)
    }
