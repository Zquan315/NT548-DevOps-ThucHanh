# VPC
variable "region_value" {
  description = "The AWS region to deploy resources in."
  type        = string
}

variable "profile_value" {
  description = "The AWS profile to use for authentication."
  type        = string
}

variable "vpc_cidr_block_value" {
  description = "The CIDR block for the VPC."
  type        = string
}

variable "vpc_cidr_block_private_value" {
  description = "The CIDR block for the private subnet."
  type        = string
}

variable "vpc_cidr_block_public_value" {
  description = "The CIDR block for the public subnet."
  type        = string
}

#route table

variable "destination_cidr_block_private_value" {
  description = "The destination CIDR block for the private route."
  type        = string
}

variable "destination_cidr_block_public_value" {
  description = "The destination CIDR block for the public route."
  type        = string
}

variable "allowed_ssh_cidr" {
  description = "The CIDR block for allowed SSH access."
  type        = string
}

variable "private_ingress_ports" {
  description = "Port list for public EC2 can access to private EC2"
  type        = list(number)
  default     = [22]
}

variable "ssh_port" {
  description = "The port for SSH access."
  type        = number
  default     = 22
}

variable "ami_id" {
  type        = string
  description = "AMI ID cho EC2 instance (Amazon Linux 2, Ubuntu v.v)"
}

variable "key_name" {
  type        = string
  description = "The name of the SSH key used to log in to EC2 instances."
}
