# AWS Free Tier CodePipeline Deployment Guide

This guide provides a cost-optimized setup for deploying an Express.js application using AWS CodePipeline while staying within the AWS Free Tier limits.

## AWS Free Tier Limits (12 months)

### Services Used and Their Limits:
- **EC2**: 750 hours/month of t2.micro instances
- **S3**: 5GB storage, 20K GET requests, 2K PUT requests/month
- **CodeBuild**: 100 build minutes/month
- **CloudWatch**: 10 metrics, 1M API requests, 5GB log ingestion/month
- **Data Transfer**: 15GB outbound data transfer/month

### Services NOT in Free Tier (Removed):
- ❌ Application Load Balancer (~$16/month minimum)
- ❌ Auto Scaling Groups with multiple instances
- ❌ NAT Gateway (~$32/month)

## Cost-Optimized Architecture

### What We Use:
✅ **Single t2.micro EC2 instance** (Free Tier eligible)
✅ **Elastic IP** (Free when attached to running instance)
✅ **Basic Security Group** (No cost)
✅ **CloudWatch Logs** (5GB/month free)
✅ **S3 Bucket** for artifacts (5GB free)
✅ **CodeBuild** (100 minutes/month free)
✅ **CodePipeline** (1 pipeline free/month)

### Estimated Monthly Cost:
- **Free Tier Usage**: $0.00
- **After Free Tier**: ~$8-12/month (mainly EC2 t2.micro)

## Pre-Deployment Checklist

### 1. AWS Account Setup
```bash
# Verify AWS CLI is configured
aws sts get-caller-identity

# Check your region (use us-east-1 for maximum Free Tier benefits)
aws configure get region
```

### 2. GitHub Repository Setup
- Create a GitHub repository for your Express.js app
- Generate a Personal Access Token with `repo` permissions
- Store the token securely (you'll need it for deployment)

### 3. Key Pair (Optional)
```bash
# Create an EC2 key pair for SSH access (optional)
aws ec2 create-key-pair --key-name express-app-key --query 'KeyMaterial' --output text > express-app-key.pem
chmod 400 express-app-key.pem
```

## Deployment Steps

### Step 1: Deploy the Pipeline
```bash
# Navigate to the template directory
cd git/codepipeline/v1

# Deploy the pipeline stack
aws cloudformation create-stack \
  --stack-name express-app-pipeline \
  --template-body file://template.yaml \
  --parameters \
    ParameterKey=GitHubOwner,ParameterValue=YOUR_GITHUB_USERNAME \
    ParameterKey=GitHubRepo,ParameterValue=YOUR_REPO_NAME \
    ParameterKey=GitHubBranch,ParameterValue=main \
    ParameterKey=GitHubToken,ParameterValue=YOUR_GITHUB_TOKEN \
    ParameterKey=ApplicationName,ParameterValue=express-app \
    ParameterKey=EnvironmentName,ParameterValue=dev \
  --capabilities CAPABILITY_NAMED_IAM
```

### Step 2: Monitor Stack Creation
```bash
# Check stack status
aws cloudformation describe-stacks --stack-name express-app-pipeline --query 'Stacks[0].StackStatus'

# Wait for completion (5-10 minutes)
aws cloudformation wait stack-create-complete --stack-name express-app-pipeline
```

### Step 3: Verify Pipeline Execution
```bash
# Check pipeline status
aws codepipeline get-pipeline-state --name express-app-pipeline

# View pipeline execution history
aws codepipeline list-pipeline-executions --pipeline-name express-app-pipeline
```

## Your Express.js Application Requirements

### Minimal package.json
```json
{
  "name": "your-express-app",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "build": "echo 'Build completed'",
    "test": "echo 'No tests specified'"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}
```

### Required Health Check Endpoint
```javascript
// In your server.js
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});
```

### Required Directory Structure
```
your-repo/
├── package.json
├── server.js
├── public/              # Static files
└── deployment/          # Copy from this repo
    ├── template.yaml
    └── parameters.json
```

## Free Tier Monitoring

### Check Your Usage
```bash
# Monitor EC2 usage
aws ec2 describe-instances --query 'Reservations[].Instances[?State.Name==`running`].[InstanceType,LaunchTime]'

# Check S3 storage usage
aws s3 ls s3://your-bucket-name --summarize --human-readable --recursive

# Monitor CodeBuild usage
aws codebuild list-builds --sort-order DESCENDING
```

### Set Up Billing Alerts
1. Go to AWS Billing Console
2. Set up a billing alert for $1-5 to catch unexpected charges
3. Enable detailed billing reports

## Cost Optimization Tips

### 1. Stop EC2 When Not Needed
```bash
# Stop instance (you'll lose data, but save money)
aws ec2 stop-instances --instance-ids i-1234567890abcdef0

# Start instance
aws ec2 start-instances --instance-ids i-1234567890abcdef0
```

### 2. Optimize Build Minutes
- Use `npm ci` instead of `npm install` in builds
- Skip tests in builds to save time
- Use smaller Docker images for CodeBuild

### 3. Manage Logs
```bash
# Delete old log streams to save space
aws logs delete-log-group --log-group-name /aws/ec2/express-app-dev
```

## Accessing Your Application

After successful deployment:

### Get Your Application URL
```bash
# Get the public IP
aws cloudformation describe-stacks \
  --stack-name express-app-dev \
  --query 'Stacks[0].Outputs[?OutputKey==`ApplicationURL`].OutputValue' \
  --output text
```

### Test Your Application
```bash
# Health check
curl http://YOUR_PUBLIC_IP:3000/health

# Main application
curl http://YOUR_PUBLIC_IP:3000/
```

### SSH Access (if key pair configured)
```bash
ssh -i express-app-key.pem ec2-user@YOUR_PUBLIC_IP
```

## Troubleshooting

### Pipeline Issues
```bash
# Get detailed pipeline execution
aws codepipeline get-pipeline-execution \
  --pipeline-name express-app-pipeline \
  --pipeline-execution-id EXECUTION_ID

# Check CodeBuild logs
aws logs get-log-events \
  --log-group-name /aws/codebuild/express-app-build \
  --log-stream-name STREAM_NAME
```

### Application Issues
```bash
# SSH into instance and check status
ssh -i express-app-key.pem ec2-user@YOUR_PUBLIC_IP
sudo systemctl status express-app
sudo journalctl -u express-app -f
```

### Common Problems

1. **Pipeline Fails at Source**: Check GitHub token permissions
2. **Build Fails**: Verify package.json scripts exist
3. **Deploy Fails**: Check CloudFormation events
4. **App Not Accessible**: Verify security group allows port 3000

## Cleanup

### Delete Everything
```bash
# Delete application stack first
aws cloudformation delete-stack --stack-name express-app-dev

# Wait for deletion
aws cloudformation wait stack-delete-complete --stack-name express-app-dev

# Delete pipeline stack
aws cloudformation delete-stack --stack-name express-app-pipeline

# Manually delete S3 bucket contents (if needed)
aws s3 rm s3://your-bucket-name --recursive
```

## Free Tier Limitations

### What You Can't Do (Without Extra Cost):
- Scale beyond 1 instance
- Use a load balancer
- Have high availability
- Handle high traffic loads
- Use RDS databases (limited free tier)

### What You CAN Do:
- Deploy and run a single Express.js application
- Handle moderate traffic (thousands of requests/day)
- Automatic deployments from GitHub
- Basic monitoring and logging
- SSL termination (with CloudFront - separate setup)

## Next Steps

Once you outgrow Free Tier:
1. Add Application Load Balancer for better reliability
2. Implement Auto Scaling for traffic spikes
3. Use RDS for persistent database storage
4. Add CloudFront for global distribution
5. Implement proper logging and monitoring

## Cost Alerts

Set up these alerts to avoid surprises:
- Billing alert at $1
- EC2 usage alert at 700 hours/month
- S3 storage alert at 4GB
- Data transfer alert at 10GB/month

Remember: AWS Free Tier is only for the first 12 months. Plan your migration strategy accordingly!
