# Week 3: Serverless Computing — API with AWS Lambda

## Project Overview

This project demonstrates the implementation of a serverless HTTP API using **AWS Lambda** and **Amazon API Gateway**.

The objective is to understand how backend logic can be executed without managing servers, and how HTTP requests can trigger cloud functions directly.

---

## Architecture Overview

**System Flow:**

```
Browser / Client
      ↓
API Gateway (HTTP API)
      ↓
AWS Lambda Function
      ↓
JSON Response
```

**Process:**

1. The client sends an HTTP request.
2. API Gateway receives the request.
3. AWS Lambda executes the function.
4. A JSON response is returned to the client.

---

## Technologies Used

* **AWS Lambda** – Serverless compute service
* **Amazon API Gateway (HTTP API)** – Exposes Lambda via HTTP
* **JSON** – Standard response format
* **AWS Console** – Function configuration, testing, and deployment

---

## Implementation Steps

### 1. Create the Lambda Function

* **Runtime:** Python
* **Function outputs:**

  * Welcome message
  * HTTP method used
  * Timestamp
  * Service name
* Function is triggered by HTTP requests from API Gateway

### 2. Test Lambda in AWS Console

* Used the **Test** feature in the Lambda console
* Verified:

  * Status code `200`
  * Correct JSON response
  * Successful execution logs

### 3. Create HTTP API in API Gateway

* Created an **HTTP API**
* Connected the API directly to the Lambda function
* Added a `GET` route
* Enabled **auto-deploy**

### 4. Deploy and Invoke the API

* Accessed the API via the **Invoke URL** provided by API Gateway
* Confirmed:

  * Lambda executed successfully
  * JSON response returned as expected
  * Timestamp updated on each request

---

## Sample API Response

```json
{
  "message": "Hello Guest, welcome to my serverless API 👋",
  "method": "GET",
  "note": null,
  "timestamp": "2026-01-31T14:28:19Z",
  "service": "AWS Lambda"
}
```

> Note: Emojis may appear as Unicode characters when viewed in raw JSON. This is expected behavior.

---

## Cold Start Explanation

A **cold start** occurs when AWS Lambda initializes a function after a period of inactivity.

* The first request may experience a slightly longer execution time.
* Subsequent requests are faster.
* This behavior is normal in serverless systems and generally acceptable for most applications.

---

## Key Learnings

* Serverless applications eliminate the need for server management.
* API Gateway serves as the entry point for HTTP traffic.
* AWS Lambda executes code only when triggered by requests.
* Cold starts introduce minor delays on first execution.
* JSON is the standard response format for APIs.

---

## Project Status

* ✅ Lambda function created and tested
* ✅ HTTP API Gateway configured
* ✅ API successfully invoked via browser
* ✅ Serverless workflow fully validated
