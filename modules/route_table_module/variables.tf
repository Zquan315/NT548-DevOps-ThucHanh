variable "vpc_id_value" {
  description = "The VPC ID to associate the route table with"
  type        = string
}

variable "route_table_private_id" {
  description = "The ID of the private route table"
  type        = string
}

variable "route_table_public_id" {
  description = "The ID of the public route table"
  type        = string
}

variable "destination_cidr_block_private" {
  description = "The destination CIDR block for the private route"
  type        = string
}

variable "destination_cidr_block_public" {
  description = "The destination CIDR block for the public route"
  type        = string
}

variable "gateway_id_private" {
  description = "The ID of the gateway for the private route"
  type        = string
}

variable "gateway_id_public" {
  description = "The ID of the gateway for the public route"
  type        = string
}

variable "subnet_id_private" {
  description = "The ID of the private subnet to associate with the private route table"
  type        = string
}
variable "subnet_id_public" {
  description = "The ID of the public subnet to associate with the public route table"
  type        = string
}