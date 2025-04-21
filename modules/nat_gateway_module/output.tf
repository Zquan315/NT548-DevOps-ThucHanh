output "nat_gateway_allocation_id" {
  description = "The ID of the Elastic IP"
  value       = aws_eip.nhom16_eip.id
}
output "nat_gateway_id" {
  description = "The ID of the NAT Gateway"
  value       = aws_nat_gateway.nhom16_nat_gateway.id
}