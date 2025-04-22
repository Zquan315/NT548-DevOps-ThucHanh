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
    nat_gateway_allocation_id = module.nat_gateway_module.nhom16_nat_gateway_allocation_id
    # NAT Gateway
    nat_gateway_subnet_id     = module.vpc_module.nhom16_subnet_public_id
    region_network_border_group = var.region_value
}

module "route_table_module" {
    source = "../modules/route_table_module"

    # Route Table
    vpc_id_value              = module.vpc_module.nhom16_vpc_id

    # Route Table Private
    route_table_private_id    = module.route_table_module.nhom16_route_table_private_id
    destination_cidr_block_private = var.destination_cidr_block_private_value
    gateway_id_private        = module.nat_gateway_module.nhom16_nat_gateway_id
    subnet_id_private = module.vpc_module.nhom16_subnet_private_id
    
    # Route Table Public
    route_table_public_id     = module.route_table_module.nhom16_route_table_public_id
    destination_cidr_block_public  = var.destination_cidr_block_public_value
    gateway_id_public         = module.vpc_module.nhom16_internet_gateway_id
    subnet_id_public = module.vpc_module.nhom16_subnet_public_id
}