module "vpc_module" {
    source = "../modules/vpc_module"
    #VPC
    cidr_block_value          = "172.31.0.0/16"
    dns_hostnames_value      = true
    dns_support_value        = true

    #private subnet
    cidr_block_private_value      = "172.31.1.0/24"
    # public subnet
    cidr_block_public_value      = "172.31.2.0/24"
}
