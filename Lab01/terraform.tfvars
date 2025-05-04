region_value  = "us-east-1"
profile_value = "quantc" #tài khoản ai người đó sử dụng 

# VPC
vpc_cidr_block_value         = "172.31.0.0/16"
vpc_cidr_block_private_value = "172.31.1.0/24"
vpc_cidr_block_public_value  = "172.31.2.0/24"

#route table
destination_cidr_block_private_value = "0.0.0.0/0"
destination_cidr_block_public_value  = "0.0.0.0/0"

#security group private
from_port_in_private_value = 22
to_port_in_private_value   = 22
protocol_in_private_value  = "tcp"

#security group public
from_port_in_public_value = 22
to_port_in_public_value   = 22
protocol_in_public_value  = "tcp"
cidr_blocks_in_public_value = ["125.212.175.47/32"] # My IP address

# EC2 instance
ami_id_value = "ami-0e449927258d45bc4" # amazon linux 2023 ami
instance_type_value = "t2.micro"
key_name_value = "virginia-key" # my key pair name
