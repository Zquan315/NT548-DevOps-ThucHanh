output "nhom16_nat_gateway_allocation_id" {
  description = "The ID of the Elastic IP"
  value       = aws_eip.nhom16_eip.id
}

output "nhom16_nat_gateway_id" {
  description = "value of nhom16_nat_gateway_id"
  value       = aws_nat_gateway.nhom16_nat_gateway.id
}