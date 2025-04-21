output "nhom16_vpc_id" {
  description = "The ID of the VPC"
  value       = aws_vpc.nhom16_vpc.id
}

output "nhom16_subnet_public_id" {
  description = "The cidr of the public subnets"
  value       = aws_subnet.nhom16_subnet_public[0].id
}

output "nhom16_subnet_private_id" {
  description = "The cidr of the private subnets"
  value       = aws_subnet.nhom16_subnet_private[0].id
  
}