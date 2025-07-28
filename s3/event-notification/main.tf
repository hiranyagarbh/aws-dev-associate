terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.4.0"
    }
  }
}

provider "aws" {
  # Configuration options
}

data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

resource "aws_s3_bucket" "default" {
}

resource "aws_s3_bucket_notification" "default" {
  bucket      = aws_s3_bucket.default.id
  eventbridge = true

  #sns
  topic {
    topic_arn     = aws_sns_topic.default.arn
    events        = ["s3:ObjectCreated:*"]
    filter_suffix = ".log"
  }

  #sqs
  queue {
    id            = "s3-event-queue"
    queue_arn     = aws_sqs_queue.default.arn
    events        = ["s3:ObjectCreated:*"]
    filter_prefix = "logs/"
  }
}

# sqs
resource "aws_sqs_queue" "default" {
  name   = "s3-eve-queue"
  policy = data.aws_iam_policy_document.sqs_queue.json
}

data "aws_iam_policy_document" "sqs_queue" {
  statement {
    effect    = "Allow"
    actions   = ["sqs:SendMessage"]
    resources = [aws_sqs_queue.default.arn]
    principals {
      type        = "Service"
      identifiers = ["s3.amazonaws.com"]
    }
    condition {
      test     = "ArnEquals"
      variable = "aws:SourceArn"
      values   = [aws_s3_bucket.default.arn]
    }
  }
}

output "s3_bucket_name" {
  value = aws_s3_bucket.default.id
}
