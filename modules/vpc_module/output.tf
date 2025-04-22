output "nhom16_vpc_id" {
  description = "The ID of the VPC"
  value       = aws_vpc.nhom16_vpc.id
}

output "nhom16_subnet_public_id" {
  description = "The cidr of the public subnets"
  value       = aws_subnet.nhom16_subnet_public.id
}

output "nhom16_subnet_private_id" {
  description = "The cidr of the private subnets"
  value       = aws_subnet.nhom16_subnet_private.id
  
}

output "nhom16_internet_gateway_id" {
  description = "The ID of the Internet Gateway"
  value       = aws_internet_gateway.nhom16_igw.id
  
}