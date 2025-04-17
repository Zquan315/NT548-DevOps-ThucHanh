variable "region_value" {
    description = "The AWS region to deploy the resources in."
    type        = string
}

variable "profile_value" {
    description = "The AWS profile to use for authentication."
    type        = string
}

variable "cidr_block_value" {
    description = "value of the CIDR block for the VPC."
    type        = string
}

variable "dns_hostnames_value" {
    description = "Enable or disable DNS hostnames for the VPC."
    type        = bool
    default     = true
  
}

variable "dns_support_value" {
    description = "Enable or disable DNS support for the VPC."
    type        = bool
    default     = true
}

variable "subnet_count_value" {
    description = "The number of subnets to create."
    type        = number
    default = 1
}

variable "cidr_block_pri_value" {
    description = "The CIDR block for the subnets."
    type        = string
}
variable "cidr_block_pub_value" {
    description = "The CIDR block for the subnets."
    type        = string
}

variable "map_public_ip_on_launch_value" {
    description = "Enable or disable mapping public IP addresses on launch."
    type        = bool
}
