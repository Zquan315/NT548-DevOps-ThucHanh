variable "vpc_id_value" {
  description = "The VPC ID to associate the security group with"
  type        = string
}

variable "security_group_name" {
  description = "The name of the security group"
  type        = string
}

variable "description" {
  description = "The description of the security group"
  type        = string
  default     = "Security group for the VPC"
}

variable "ingress_rules" {
  description = "Ingress rule"
  type = list(object({
    from_port             = number
    to_port               = number
    protocol              = string
    cidr_blocks           = optional(list(string), [])
    source_security_group = optional(list(string), [])
  }))
  default = []
}

variable "egress_rules" {
  description = "Egress rules"
  type = list(object({
    from_port   = number
    to_port     = number
    protocol    = string
    cidr_blocks = list(string)
  }))
  default = [{
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }]
}