variable "vpc_id" {
  description = "The VPC ID to associate the security group with"
  type        = string
}

variable "from_port_in_private" {
  description = "The starting port for the ingress rule"
  type        = number
}

variable "to_port_in_private" {
  description = "The ending port for the ingress rule"
  type        = number
}

variable "protocol_in_private" {
  description = "The protocol for the ingress rule"
  type        = string
}

variable "public_security_group_id" {
  description = "The security group ID for the public security group"
  type        = string
}

variable "from_port_e_private" {
  description = "The starting port for the egress rule"
  type        = number
  default = 0
}

variable "to_port_e_private" {
  description = "The ending port for the egress rule"
  type        = number
  default = 0
}

variable "protocol_e_private" {
  description = "The protocol for the egress rule"
  type        = string
  default = "-1"
}

variable "cidr_blocks_e_private" {
  description = "The CIDR blocks for the egress rule"
  type        = list(string)
  default = ["0.0.0.0/0"]
}

#public security group
variable "from_port_in_public" {
  description = "The starting port for the ingress rule"
  type        = number
}

variable "to_port_in_public" {
  description = "The ending port for the ingress rule"
  type        = number
}

variable "protocol_in_public" {
  description = "The protocol for the ingress rule"
  type        = string
}

variable "cidr_blocks_in_public" {
  description = "The CIDR blocks for the ingress rule"
  type        = list(string)
}

variable "from_port_e_public" {
  description = "The starting port for the egress rule"
  type        = number
  default = 0
}

variable "to_port_e_public" {
  description = "The ending port for the egress rule"
  type        = number
  default = 0
}

variable "protocol_e_public" {
  description = "The protocol for the egress rule"
  type        = string
  default = "-1"
}

variable "cidr_blocks_e_public" {
  description = "The CIDR blocks for the egress rule"
  type        = list(string)
  default = ["0.0.0.0/0"]
}