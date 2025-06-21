# AWS CodePipeline v1 for Express.js Application

This repository contains AWS CloudFormation templates and configuration files to set up a complete CI/CD pipeline for deploying an Express.js application using AWS CodePipeline v1.

## Architecture Overview

The pipeline consists of:
- **Source Stage**: GitHub repository integration
- **Build Stage**: AWS CodeBuild for building and testing the application
- **Deploy Stage**: CloudFormation deployment to AWS infrastructure

## Infrastructure Components

### Pipeline Infrastructure
- **CodePipeline**: Orchestrates the CI/CD workflow
- **CodeBuild**: Builds and tests the application
- **S3 Bucket**: Stores pipeline artifacts
- **IAM Roles**: Permissions for pipeline components

### Application Infrastructure
- **Application Load Balancer (ALB)**: Distributes traffic
- **Auto Scaling Group**: Manages EC2 instances
- **EC2 Instances**: Hosts the Express.js application
- **Security Groups**: Controls network access
- **CloudWatch**: Monitoring and logging

## Prerequisites

1. **AWS CLI** configured with appropriate permissions
2. **GitHub Personal Access Token** with repo access
3. **AWS Account** with necessary permissions
4. **EC2 Key Pair** (optional, for SSH access)
5. **SSL Certificate** (optional, for HTTPS)

## Quick Start

### 1. Prepare Your GitHub Repository

Ensure your Express.js application repository contains:
- `package.json` with build scripts
- `server.js` or main application file
- Static assets in `public/` directory

### 2. Deploy the Pipeline

```bash
# Clone this repository
git clone <your-repo-url>
cd git/codepipeline/v1

# Deploy the pipeline CloudFormation stack
aws cloudformation create-stack \
  --stack-name express-app-pipeline \
  --template-body file://template.yaml \
  --parameters \
    ParameterKey=GitHubOwner,ParameterValue=your-github-username \
    ParameterKey=GitHubRepo,ParameterValue=your-express-app-repo \
    ParameterKey=GitHubBranch,ParameterValue=main \
    ParameterKey=GitHubToken,ParameterValue=your-github-token \
    ParameterKey=ApplicationName,ParameterValue=express-app \
    ParameterKey=EnvironmentName,ParameterValue=dev \
  --capabilities CAPABILITY_NAMED_IAM
```

### 3. Monitor Deployment

```bash
# Check stack status
aws cloudformation describe-stacks --stack-name express-app-pipeline

# View pipeline execution
aws codepipeline get-pipeline-state --name express-app-pipeline
```

## File Structure

```
git/codepipeline/v1/
├── template.yaml              # Main pipeline CloudFormation template
├── buildspec.yaml            # CodeBuild build specification
├── deployment/
│   ├── template.yaml         # Application infrastructure template
│   └── parameters.json       # Environment-specific parameters
├── sample-package.json       # Example package.json for Express.js app
├── sample-server.js          # Example Express.js server
└── README.md                 # This file
```

## Configuration

### Pipeline Parameters

| Parameter | Description | Default | Required |
|-----------|-------------|---------|----------|
| `GitHubOwner` | GitHub repository owner | `your-github-username` | Yes |
| `GitHubRepo` | GitHub repository name | `your-express-app` | Yes |
| `GitHubBranch` | GitHub branch to track | `main` | Yes |
| `GitHubToken` | GitHub personal access token | - | Yes |
| `ApplicationName` | Name of the application | `express-app` | Yes |
| `EnvironmentName` | Environment name (dev/staging/prod) | `dev` | Yes |

### Application Parameters

| Parameter | Description | Default | Required |
|-----------|-------------|---------|----------|
| `InstanceType` | EC2 instance type | `t3.micro` | No |
| `KeyPairName` | EC2 Key Pair for SSH access | Empty | No |
| `VpcId` | VPC ID for resources | Default VPC | No |
| `SubnetIds` | Subnet IDs for load balancer | Default subnets | No |
| `SSLCertificateArn` | SSL certificate ARN for HTTPS | Empty | No |

## Build Process

The `buildspec.yaml` file defines the build process:

### Pre-build Phase
- Installs Node.js dependencies
- Runs tests (if available)

### Build Phase
- Builds static assets
- Prepares application for deployment

### Post-build Phase
- Creates deployment artifacts
- Prepares CloudFormation templates

## Deployment Process

The deployment stage uses CloudFormation to:
1. Create a change set with new infrastructure changes
2. Execute the change set to apply changes
3. Deploy the Express.js application to EC2 instances

## Express.js Application Structure

Your Express.js application should follow this structure:

```
your-express-app/
├── package.json              # Dependencies and scripts
├── server.js                 # Main application file
├── public/                   # Static assets
│   ├── css/
│   ├── js/
│   └── images/
├── src/                      # Source files
│   ├── routes/
│   ├── middleware/
│   └── utils/
└── deployment/               # Deployment files (copied from this repo)
    ├── template.yaml
    └── parameters.json
```

### Required Scripts in package.json

```json
{
  "scripts": {
    "start": "node server.js",
    "build": "npm run build:css && npm run build:js",
    "build:css": "node-sass src/styles/main.scss public/css/main.css --output-style compressed",
    "build:js": "webpack --mode=production",
    "test": "jest"
  }
}
```

### Health Check Endpoint

Your Express.js application must include a health check endpoint:

```javascript
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});
```

## Environment Variables

The following environment variables are available to your application:

- `NODE_ENV`: Set to `production`
- `PORT`: Application port (default: 3000)
- `AWS_REGION`: AWS region
- `APPLICATION_NAME`: Application name
- `ENVIRONMENT_NAME`: Environment name

## Monitoring

### CloudWatch Logs
- System logs: `/aws/ec2/${ApplicationName}-${EnvironmentName}`
- Application logs: Available through CloudWatch agent

### Health Checks
- ALB health checks: `/health` endpoint
- Auto Scaling health checks: ELB-based

### Metrics
- ALB metrics: Request count, response time, error rate
- EC2 metrics: CPU, memory, disk usage
- Auto Scaling metrics: Instance count, scaling activities

## Security

### Network Security
- Security groups restrict access to necessary ports only
- ALB accepts traffic on ports 80 and 443 (if SSL configured)
- EC2 instances only accept traffic from ALB

### IAM Permissions
- Principle of least privilege applied to all roles
- Separate roles for pipeline, build, and deployment

### SSL/TLS
- Optional SSL certificate support
- Automatic HTTP to HTTPS redirect when SSL is configured

## Troubleshooting

### Common Issues

1. **Pipeline Fails at Source Stage**
   - Verify GitHub token has repo access
   - Check repository and branch names
   - Ensure webhook is properly configured

2. **Build Stage Fails**
   - Check build logs in CodeBuild console
   - Verify package.json scripts exist
   - Ensure all dependencies are specified

3. **Deploy Stage Fails**
   - Check CloudFormation events
   - Verify IAM permissions
   - Check parameter values

### Debugging Commands

```bash
# View pipeline execution history
aws codepipeline list-pipeline-executions --pipeline-name express-app-pipeline

# Get build logs
aws logs get-log-events --log-group-name /aws/codebuild/express-app-build

# Check CloudFormation stack events
aws cloudformation describe-stack-events --stack-name express-app-dev
```

## Customization

### Adding Stages
You can add additional stages to the pipeline by modifying the `template.yaml`:

```yaml
# Example: Add a test stage
- Name: Test
  Actions:
    - Name: TestAction
      ActionTypeId:
        Category: Test
        Owner: AWS
        Provider: CodeBuild
        Version: "1"
      Configuration:
        ProjectName: !Ref TestProject
      InputArtifacts:
        - Name: BuildOutput
```

### Environment-Specific Configuration
Use the `parameters.json` file to configure different environments:

```json
{
  "dev": [...],
  "staging": [...],
  "prod": [...]
}
```

## Cost Optimization

- Use `t3.micro` instances for development
- Enable detailed monitoring only when needed
- Configure log retention periods appropriately
- Use reserved instances for production workloads

## Best Practices

1. **Source Control**: Keep all infrastructure as code
2. **Testing**: Include automated tests in the build process
3. **Security**: Regularly rotate GitHub tokens and review IAM permissions
4. **Monitoring**: Set up CloudWatch alarms for critical metrics
5. **Backup**: Enable versioning on S3 artifact bucket

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review AWS CloudFormation and CodePipeline documentation
3. Check AWS service health dashboard
4. Review CloudWatch logs for detailed error information

## License

This project is licensed under the MIT License - see the LICENSE file for details.
