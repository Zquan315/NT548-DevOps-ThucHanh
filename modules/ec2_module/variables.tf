variable "ami_id" {
  type        = string
  description = "AMI ID to launch the instance"
}

variable "instance_type" {
  type        = string
  description = "EC2 instance type"
}

variable "subnet_id_private" {
  type        = string
  description = "The private subnet in which to launch the EC2 instance"
}

variable "security_group_id_private" {
  type        = list(string)
  description = "The security group ID associated with the EC2 instance"
}

variable "key_name" {
  type        = string
  description = "The name of the SSH key pair used to connect"
}

variable "subnet_id_public" {
  type        = string
  description = "The public subnet in which to launch the EC2 instance"
}

variable "security_group_id_public" {
  type        = list(string)
  description = "The security group ID associated with the EC2 instance"
}
