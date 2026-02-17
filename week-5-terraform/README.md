# Week 5 -- Infrastructure as Code with Terraform (AWS EC2 + Nginx)

## Project Overview

This project demonstrates provisioning AWS infrastructure using
**Terraform** to deploy a publicly accessible web server running
**Nginx**.

All infrastructure was defined as code and deployed using:

-   terraform init
-   terraform plan
-   terraform apply

The EC2 instance automatically installs and configures Nginx at launch
using user_data, serving a custom HTML page without any manual
configuration after deployment.

------------------------------------------------------------------------

## Architecture Components

The following AWS resources were provisioned:

-   Custom VPC (10.0.0.0/16)
-   Public Subnet (10.0.1.0/24)
-   Internet Gateway
-   Route Table with default route (0.0.0.0/0 → IGW)
-   Route Table Association
-   Security Group (Ports 22 and 80 open)
-   EC2 Instance (Ubuntu 20.04 LTS -- dynamically fetched AMI)
-   Nginx Web Server (installed automatically via user_data)

------------------------------------------------------------------------

## Architecture Flow

Internet\
↓\
Internet Gateway\
↓\
Public Subnet\
↓\
EC2 Instance (Ubuntu)\
↓\
Nginx Web Server\
↓\
Custom HTML Page

------------------------------------------------------------------------

## Networking Configuration

### VPC

A custom VPC was created with CIDR block: 10.0.0.0/16

### Public Subnet

A public subnet was configured: 10.0.1.0/24

map_public_ip_on_launch = true ensures instances receive a public IP
automatically.

### Internet Access

-   Internet Gateway attached to VPC
-   Route table created
-   Default route (0.0.0.0/0) pointed to IGW
-   Route table associated with the public subnet

This enables full internet connectivity.

------------------------------------------------------------------------

## Security Group Configuration

The security group allows:

-   SSH (Port 22) from 0.0.0.0/0
-   HTTP (Port 80) from 0.0.0.0/0

Outbound traffic is fully open.

Note: Opening SSH to 0.0.0.0/0 is acceptable for learning but not
recommended for production environments.

------------------------------------------------------------------------

## EC2 Instance Configuration

-   Ubuntu 20.04 AMI (latest version via data source)
-   Instance type defined via Terraform variable
-   Key pair attached for SSH authentication
-   Associated with public subnet and security group

------------------------------------------------------------------------

## Automatic Server Provisioning (user_data)

#!/bin/bash\
apt-get update -y\
apt-get install -y nginx

echo "
```{=html}
<h1>
```
Infrastructure as Code in Action
```{=html}
</h1>
```
```{=html}
<p>
```
Provisioned using Terraform.
```{=html}
</p>
```
" \> /var/www/html/index.html

systemctl enable nginx\
systemctl start nginx

This ensures: - Nginx is installed - A custom HTML page is created -
Nginx starts automatically on boot

No manual server configuration is required.

------------------------------------------------------------------------

## Deployment Steps

1.  Initialize Terraform\
    terraform init

2.  Review Execution Plan\
    terraform plan

3.  Apply Configuration\
    terraform apply

After successful deployment, access the web server via:
http://`<EC2-public-ip>`{=html}

------------------------------------------------------------------------

## Validation and Testing

The following checks were performed:

-   Verified EC2 instance status (Running, 2/2 checks passed)
-   Confirmed Nginx service status using systemctl
-   Confirmed port 80 is listening using ss command
-   Verified server response locally using curl
-   Confirmed public browser access

------------------------------------------------------------------------

## Key Technical Learnings

-   Building AWS infrastructure using Terraform
-   Managing networking dependencies (VPC, IGW, route tables)
-   Understanding public subnet configuration
-   Using user_data for automated instance provisioning
-   Debugging cloud-init and service startup issues
-   SSH authentication using AWS key pairs
-   Differentiating infrastructure-level vs application-level failures

------------------------------------------------------------------------

## Security Considerations

The following items are excluded using .gitignore:

.terraform/\
terraform.tfstate\
terraform.tfstate.backup\
\*.pem

This prevents sensitive state files and private keys from being
committed to version control.

------------------------------------------------------------------------

## Outcome

This project successfully demonstrates:

-   Infrastructure as Code (IaC) principles
-   Automated provisioning and configuration
-   Public web server deployment on AWS
-   Clean separation of infrastructure and configuration logic

All infrastructure was deployed and managed entirely through Terraform
without manual AWS Console configuration.

