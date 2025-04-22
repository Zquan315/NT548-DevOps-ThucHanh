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
