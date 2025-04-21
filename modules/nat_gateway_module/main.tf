# Allocate an Elastic IP
resource "aws_eip" "nhom16_eip" {
    network_border_group = var.region_network_border_group
    tags = {
        Name = "nhom16_eip"
    }
}

# NAT Gateway
resource "aws_nat_gateway" "nhom16_nat_gateway" {
    allocation_id     = var.nat_gateway_allocation_id
    subnet_id         = var.nat_gateway_subnet_id
    connectivity_type = var.nat_gateway_connectivity_type
    tags = {
        Name = "nhom16_nat_gateway"
    }
}