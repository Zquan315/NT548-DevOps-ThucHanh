output "vpc_id" {
  description = "The ID of the VPC"
  value       = aws_vpc.nhom16_vpc.id
}

output "vpc_cidr" {
  description = "The cidr of the VPC"
  value       = aws_vpc.nhom16_vpc.cidr_block
  
}
output "public_subnet_cidr" {
  description = "The cidr of the public subnets"
  value       = aws_subnet.nhom16_subnet_public[*].cidr_block
}

output "private_subnet_cidr" {
  description = "The cidr of the private subnets"
  value       = aws_subnet.nhom16_subnet_private[*].cidr_block
  
}