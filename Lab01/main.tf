# create VPC and subnets
module "vpc_module" {
  source = "../modules/vpc_module"
  #VPC
  cidr_block_value         = var.vpc_cidr_block_value
  cidr_block_private_value = var.vpc_cidr_block_private_value
  cidr_block_public_value  = var.vpc_cidr_block_public_value
}

# Create Nat Gateway
module "nat_gateway_module" {
  source = "../modules/nat_gateway_module"
  # Allocate an Elastic IP
  nat_gateway_allocation_id = module.nat_gateway_module.nhom16_nat_gateway_allocation_id
  # NAT Gateway
  nat_gateway_subnet_id       = module.vpc_module.nhom16_subnet_public_id
  region_network_border_group = var.region_value
}

# create route table
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

# Create Security Groups
module "security_group_module" {
  source = "../modules/security_group_module"
  vpc_id = module.vpc_module.nhom16_vpc_id
  # Security Group Private ingress

  from_port_in_private = var.from_port_in_private_value
  to_port_in_private   = var.to_port_in_private_value
  protocol_in_private  = var.protocol_in_private_value
  public_security_group_id =  module.security_group_module.nhom16_security_group_public_id

  # Security Group Public ingress
  from_port_in_public   = var.from_port_in_public_value
  to_port_in_public     = var.to_port_in_public_value
  protocol_in_public    = var.protocol_in_public_value
  cidr_blocks_in_public = var.cidr_blocks_in_public_value

}

# Create EC2 instances
module "ec2_instance_module" {
  source              = "../modules/ec2_module"
  ami_id              = var.ami_id_value
  instance_type       = var.instance_type_value
  key_name            = var.key_name_value

  # EC2 Private Instance
  subnet_id_private           = module.vpc_module.nhom16_subnet_private_id
  security_group_id_private   = [module.security_group_module.nhom16_security_group_private_id]

  # EC2 Public Instance
  subnet_id_public            = module.vpc_module.nhom16_subnet_public_id
  security_group_id_public    = [module.security_group_module.nhom16_security_group_public_id]
  
}


