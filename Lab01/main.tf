module "vpc_module" {
  source = "../modules/vpc_module"
  #VPC
  cidr_block_value         = var.vpc_cidr_block_value
  cidr_block_private_value = var.vpc_cidr_block_private_value
  cidr_block_public_value  = var.vpc_cidr_block_public_value
}

module "nat_gateway_module" {
  source = "../modules/nat_gateway_module"
  # Allocate an Elastic IP
  nat_gateway_allocation_id = module.nat_gateway_module.nhom16_nat_gateway_allocation_id
  # NAT Gateway
  nat_gateway_subnet_id       = module.vpc_module.nhom16_subnet_public_id
  region_network_border_group = var.region_value
}

module "route_table_module" {
  source = "../modules/route_table_module"

  # Route Table
  vpc_id_value = module.vpc_module.nhom16_vpc_id

  # Route Table Private
  route_table_private_id         = module.route_table_module.nhom16_route_table_private_id
  destination_cidr_block_private = var.destination_cidr_block_private_value
  gateway_id_private             = module.nat_gateway_module.nhom16_nat_gateway_id
  subnet_id_private              = module.vpc_module.nhom16_subnet_private_id

  # Route Table Public
  route_table_public_id         = module.route_table_module.nhom16_route_table_public_id
  destination_cidr_block_public = var.destination_cidr_block_public_value
  gateway_id_public             = module.vpc_module.nhom16_internet_gateway_id
  subnet_id_public              = module.vpc_module.nhom16_subnet_public_id
}

module "public_security_group_module" {
    source              = "../modules/security_group_module"
    security_group_name = "nhom16_public_security_group"
    description = "Allow SSH access from specific IP"
    vpc_id_value        = module.vpc_module.nhom16_vpc_id

    # Ingress Rules
    ingress_rules = [
        {
        from_port             = var.ssh_port
        to_port               = var.ssh_port
        protocol              = "tcp"
        cidr_blocks           = [var.allowed_ssh_cidr]
        source_security_group = []
        }
    ]
}

module "private_security_group_module" {
    source              = "../modules/security_group_module"
    security_group_name = "nhom16_private_security_group"
    description = "Allow SSH access from public security group"
    vpc_id_value        = module.vpc_module.nhom16_vpc_id

    # Ingress Rules   
    ingress_rules = [
        for port in var.private_ingress_ports : {
        from_port             = port
        to_port               = port
        protocol              = "tcp"
        cidr_blocks           = []
        source_security_group = [module.public_security_group_module.security_group_id]
        }
    ]
}