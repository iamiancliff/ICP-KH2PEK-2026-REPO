# Week 1 – Cloud Fundamentals: Static Site Hosting

## 📌 Project Overview

This Week 1 project focuses on hosting a **static website on Amazon S3** as part of the Cloud Computing Internship.

The goal was to understand S3 object storage, permissions, and static website hosting **using AWS CLI via WSL (Ubuntu)**.

The website created is a **small, professional HTML & CSS bookstore landing page** (Lumina Books), designed to look realistic for portfolio purposes.

---

## 🧠 What is Amazon S3?

Amazon S3 (Simple Storage Service) is an object storage service by AWS that allows you to store and retrieve any amount of data from anywhere on the web.

It combines **scalability, security, and cost-efficiency**, making it ideal for hosting static websites.

---

## 🛠️ Technologies Used

- **Amazon S3**
- **AWS CLI v2**
- **WSL (Ubuntu)**
- **HTML & CSS**
- **Git & GitHub**

---

## 🌍 S3 Bucket Setup

- **Bucket Name:** `icp-iancliff-static-site`
- **Region:** Africa (Cape Town / `af-south-1`) — chosen for proximity

> **Note:** Bucket names are globally unique. No other AWS account can use the same name unless it is deleted.

### Bucket Creation Command:

```bash
aws s3api create-bucket \
  --bucket icp-iancliff-static-site \
  --region af-south-1 \
  --create-bucket-configuration LocationConstraint=af-south-1
```

---

## 📂 Upload Website Files

Uploaded the following:

- `index.html`
- `styles.css`
- `/images/` folder containing all book and category images

Command used:

```bash
aws s3 sync . s3://icp-iancliff-static-site
```

> **Screenshot tip:** Capture terminal output showing successful file uploads.

---

## 🖥️ Enable Static Website Hosting

Enabled S3 static website hosting with `index.html` as the entry point:

```bash
aws s3 website s3://icp-iancliff-static-site --index-document index.html
```

- S3 generates a bucket endpoint URL which you can open in a browser
- This URL allows anyone to access the website publicly

---

## 🔑 Make Objects Public

Initially, accessing the website gave a **403 Forbidden** error because objects are private by default.

### Resolution:

1. Disabled **"Block Public Access"** for the bucket in the AWS Management Console
2. Applied a bucket policy allowing public read:

**bucket-policy.json**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::icp-iancliff-static-site/*"
    }
  ]
}
```

Command to apply:

```bash
aws s3api put-bucket-policy --bucket icp-iancliff-static-site --policy file://bucket-policy.json
```

> **Lesson:** S3 objects are private by default; public access must be explicitly allowed.

---

## 🌐 Website Access

**S3 Endpoint URL:**  
`http://icp-iancliff-static-site.s3-website.af-south-1.amazonaws.com`

> Screenshot the live website with CSS and images fully loading.

---

## ⚠️ Challenges & Learning Points

- **403 Error** when first accessing the site → learned about S3 default object privacy
- **CLI-first workflow** using WSL instead of AWS Console → improved hands-on cloud skills
- Importance of **bucket policies vs ACLs**
- Understanding of **region selection** and globally unique bucket names
- Quick experience with **debugging, troubleshooting, and verifying** AWS resources

---

## 🧹 Cleanup

The S3 bucket was deleted to avoid leaving public resources running.
