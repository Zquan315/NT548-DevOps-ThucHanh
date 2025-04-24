variable "ami_id" {
  type        = string
  description = "AMI ID to launch the instance"
}

variable "instance_type" {
  type        = string
  description = "EC2 instance type"
}

variable "subnet_id" {
  type        = string
  description = "The subnet in which to launch the EC2 instance"
}

variable "security_group_id" {
  type        = string
  description = "The security group ID associated with the EC2 instance"
}

variable "associate_public_ip" {
  type        = bool
  description = "Whether to associate a public IP address"
}

variable "key_name" {
  type        = string
  description = "The name of the SSH key pair used to connect"
}

variable "instance_name" {
  type        = string
  description = "Name to assign to the EC2 instance"
}
