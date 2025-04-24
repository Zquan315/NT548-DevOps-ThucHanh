region_value  = "us-east-1"
profile_value = "" #tài khoản ai người đó sử dụng 

# VPC
vpc_cidr_block_value         = "172.31.0.0/16"
vpc_cidr_block_private_value = "172.31.1.0/24"
vpc_cidr_block_public_value  = "172.31.2.0/24"

#route table
destination_cidr_block_private_value = "0.0.0.0/0"
destination_cidr_block_public_value  = "0.0.0.0/0"

#security group
allowed_ssh_cidr      = "171.224.240.4/32" #ip này tự check, check command line: curl https://checkip.amazonaws.com
private_ingress_ports = [22]
ssh_port = 22