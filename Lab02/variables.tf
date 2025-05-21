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


# variables for security group
variable "from_port_in_private_value" {
  description = "The starting port for ingress rules in the private security group."
  type        = number
}

variable "to_port_in_private_value" {
  description = "The ending port for ingress rules in the private security group."
  type        = number
}

variable "protocol_in_private_value" {
  description = "The protocol for ingress rules in the private security group."
  type        = string
}


variable "from_port_in_public_value" {
  description = "The starting port for ingress rules in the public security group."
  type        = number
}

variable "to_port_in_public_value" {
  description = "The ending port for ingress rules in the public security group."
  type        = number
}

variable "protocol_in_public_value" {
  description = "The protocol for ingress rules in the public security group."
  type        = string
}

variable "cidr_blocks_in_public_value" {
  description = "The CIDR blocks for ingress rules in the public security group."
  type        = list(string)
}

# variables for ec2 instance
variable "ami_id_value" {
  type        = string
  description = "AMI ID cho EC2 instance (Amazon Linux 2, Ubuntu v.v)"
}

variable "key_name_value" {
  type        = string
  description = "The name of the SSH key used to log in to EC2 instances."
}

variable "instance_type_value" {
  description = "EC2 instance type"
  type        = string
}

