module "vpc_module" {
    source = "../modules/vpc_module"
    #VPC
    cidr_block_value          = var.vpc_cidr_block_value
    cidr_block_private_value      = var.vpc_cidr_block_private_value
    cidr_block_public_value      = var.vpc_cidr_block_public_value
}

module "nat_gateway_module" {
    source = "../modules/nat_gateway_module"
    # Allocate an Elastic IP
    nat_gateway_allocation_id = module.nat_gateway_module.nat_gateway_allocation_id
    # NAT Gateway
    nat_gateway_subnet_id     = module.vpc_module.nhom16_subnet_public_id
    region_network_border_group = var.region_value
}