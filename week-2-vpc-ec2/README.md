
# Week 2: Compute & Networking

## Project: VPC & EC2 Setup

## Description

This project focused on launching a Linux server inside a **custom Amazon VPC** and securely connecting to it using **SSH**.
The goal was to understand how networking, security groups, and compute work together in AWS.

As an extra step, I installed **Nginx** on the server to confirm that the instance could serve web traffic over the internet.

---

## Tech Stack

* AWS VPC
* Amazon EC2
* Security Groups
* SSH
* Ubuntu Linux
* Nginx

---

## What is Amazon EC2?

Amazon EC2 (Elastic Compute Cloud) allows you to run virtual servers in the cloud.
It gives you control over the operating system, networking, and security while removing the need to manage physical hardware.

---

## How I Used EC2 in This Project

I used Amazon EC2 to:

* Launch an Ubuntu Linux server
* Place the server inside a custom VPC
* Control access using Security Groups
* Connect securely via SSH from my local machine
* Host a simple web service using Nginx

---

## How I Set Up Networking (VPC)

* Created a **custom VPC** with CIDR block `10.0.0.0/16`
* Created a **public subnet** inside the VPC
* Attached an **Internet Gateway** to allow internet access
* Configured a route table to route `0.0.0.0/0` traffic to the Internet Gateway
* Enabled **auto-assign public IPv4** for the subnet

This setup ensured the EC2 instance could be accessed from the internet.

---

## Security Groups (Firewall)

Security Groups were used to control inbound traffic:

* SSH (port 22) allowed only from my public IP
* HTTP (port 80) allowed from anywhere to test web access

This helped me understand how AWS firewalls work at the instance level.

---

## SSH Access

I connected to the EC2 instance using SSH from a **WSL (Ubuntu)** terminal:

* Used an existing key pair
* Verified access by successfully logging into the Ubuntu server

Once connected, I confirmed the instance was running correctly.

---

## Installing Nginx

After SSH access was successful:

* Updated system packages
* Installed Nginx
* Started the Nginx service

When I opened the EC2 public IPv4 address in a browser, the **Nginx welcome page** loaded successfully, confirming everything was working.

---

## Issues I Faced

* Permission errors when creating VPC resources
  → Fixed by attaching the correct EC2 permissions to the IAM user

* Confusion between CLI and Management Console resources
  → Learned to verify regions and rely on resource IDs

* Security group rule duplication
  → AWS blocked duplicate rules, confirming the rule already existed

---

## One Thing I Didn’t Expect

I didn’t expect networking concepts like subnets, route tables, and security groups to become clearer once I saw them working together in a real setup.

---

## Key Learnings

* A subnet becomes public only when it has a route to an Internet Gateway
* Security Groups act as the main firewall for EC2
* SSH access depends on both key pairs and inbound rules
* CLI and Management Console show the same resources in different ways
* Installing a web server is a good way to validate networking

---

**Program:** Intern Career Path 2026
**Environment:** WSL (Ubuntu)
**Author:** Ian Cliff Wende
