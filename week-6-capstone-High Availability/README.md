# Week 6 Project -- Highly Available Frontend Deployment on AWS

## Project Overview

This project demonstrates the deployment of a production-style frontend
application on AWS using a highly available and scalable architecture.
The goal was to implement a secure, fault-tolerant infrastructure using
best practices in networking, compute, and load balancing.

The application is deployed in private subnets behind an Application
Load Balancer, with outbound internet access provided via a NAT Gateway.
Auto Scaling ensures elasticity based on CPU utilization.

------------------------------------------------------------------------

## Architecture Summary

The architecture consists of:

-   A custom VPC
-   Public and Private subnets across two Availability Zones
-   Internet Gateway (for public traffic)
-   NAT Gateway (for private outbound traffic)
-   Application Load Balancer (ALB)
-   Target Group with health checks
-   Auto Scaling Group (ASG)
-   Launch Template with User Data
-   EC2 instances in private subnets
-   S3 bucket for frontend build artifact

Traffic Flow:

Internet → ALB (Public Subnets) → Target Group → EC2 (Private Subnets)\
Private EC2 → NAT Gateway → Internet (for S3 access)

------------------------------------------------------------------------

## Deployment Process

### 1. Networking Setup

-   Created a custom VPC with appropriate CIDR block.
-   Configured two public subnets and two private subnets across
    different AZs.
-   Attached an Internet Gateway to the VPC.
-   Created route tables:
    -   Public subnets route 0.0.0.0/0 → Internet Gateway
    -   Private subnets route 0.0.0.0/0 → NAT Gateway

### 2. Security Configuration

-   ALB Security Group allows HTTP (port 80) from the internet.
-   EC2 Security Group allows HTTP only from the ALB Security Group.
-   EC2 instances do not have public IP addresses.
-   IAM Role attached to EC2 with:
    -   AmazonS3ReadOnlyAccess
    -   AmazonSSMManagedInstanceCore

### 3. Launch Template & User Data

-   Used Ubuntu 24.04 AMI.
-   Installed Nginx, unzip, curl.
-   Installed AWS CLI v2 manually (required for Ubuntu 24.04).
-   Downloaded frontend artifact from S3.
-   Unzipped and deployed files to `/var/www/html`.
-   Configured proper file permissions.
-   Restarted Nginx.

### 4. Load Balancer Configuration

-   Created Internet-facing Application Load Balancer.
-   Attached to public subnets in two AZs.
-   Created Target Group with HTTP health check on `/`.
-   Verified targets became healthy.

### 5. Auto Scaling Configuration

-   Configured ASG across private subnets in two AZs.
-   Set minimum, desired, and maximum capacity.
-   Configured target tracking scaling policy based on CPU utilization.

------------------------------------------------------------------------

## Testing & Validation

### Deployment Verification

-   Confirmed AWS CLI installation inside instance.
-   Verified S3 artifact download.
-   Confirmed files exist in `/var/www/html`.
-   Tested locally using `curl localhost`.
-   Verified application accessible via ALB DNS.

### High Availability Test

-   Manually terminated one EC2 instance.
-   Confirmed ASG automatically launched a replacement.
-   Verified application remained accessible via ALB.

### Auto Scaling Test

-   Generated CPU load using stress tool.
-   Observed CPU spike in CloudWatch metrics.
-   Verified ASG activity log showed new instance launch.
-   Confirmed new instance registered as healthy in target group.

------------------------------------------------------------------------

## Key Learnings

1.  Ubuntu 24.04 does not support installing AWS CLI via
    `apt install awscli`. AWS CLI v2 must be installed manually.
2.  User data scripts only execute on first instance boot. Updating
    launch templates requires instance replacement or refresh.
3.  Proper route table configuration is critical for private subnet
    internet access.
4.  Health checks must align with actual application paths.
5.  High availability requires:
    -   Multi-AZ deployment
    -   Load balancing
    -   Auto Scaling
6.  Observability using CloudWatch is essential for validating scaling
    behavior.

------------------------------------------------------------------------

## Final Outcome

The frontend application is now:

-   Highly available across multiple Availability Zones
-   Securely deployed in private subnets
-   Scalable based on CPU utilization
-   Accessible via an Application Load Balancer
-   Automatically recoverable from instance failure

This project demonstrates practical implementation of core AWS
infrastructure principles including networking, compute, load balancing,
security, and elasticity.

