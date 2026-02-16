terraform {
  backend "s3" {
    bucket = "icp-s3-terraform"
    key    = "week5/terraform.tfstate"
    region = "us-east-1"
  }
}
