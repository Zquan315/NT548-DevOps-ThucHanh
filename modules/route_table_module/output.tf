output "nhom16_route_table_private_id" {
  description = "id of the private route table"
  value       = aws_route_table.nhom16_route_table_private.id
}

output "nhom16_route_table_public_id" {
  description = "id of the public route table"
  value       = aws_route_table.nhom16_route_table_public.id
}