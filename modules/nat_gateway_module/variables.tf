variable "nat_gateway_allocation_id" {
  description = "The allocation ID of the Elastic IP address for the NAT gateway."
  type        = string
}

variable "nat_gateway_subnet_id" {
  description = "The subnet ID where the NAT gateway will be deployed."
  type        = string
}

variable "nat_gateway_connectivity_type" {
  description = "The connectivity type for the NAT gateway. Can be either 'public' or 'private'."
  type        = string
  default     = "public"
}

variable "region_network_border_group" {
  description = "The network border group for the Elastic IP address."
  type        = string
}