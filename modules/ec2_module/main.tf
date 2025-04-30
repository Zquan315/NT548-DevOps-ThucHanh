resource "aws_instance" "nhom16_ec2_private" {
  ami                         = var.ami_id
  instance_type               = var.instance_type
  subnet_id                   = var.subnet_id_private
  vpc_security_group_ids      = var.security_group_id_private
  key_name                    = var.key_name
  tags = {
    Name = "EC2 Private Instance"
  }
}

resource "aws_instance" "nhom16_ec2_public" {
  ami                         = var.ami_id
  instance_type               = var.instance_type
  subnet_id                   = var.subnet_id_public
  vpc_security_group_ids      = var.security_group_id_public
  key_name                    = var.key_name
  tags = {
    Name = "EC2 Public Instance"
  }
}