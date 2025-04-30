resource "aws_security_group" "nhom16_security_group_private" {
  vpc_id      = var.vpc_id
  tags = {
    Name = "nhom16_security_group_private"
  }
  ingress {
      from_port       = var.from_port_in_private
      to_port         = var.to_port_in_private
      protocol        = var.protocol_in_private
      security_groups = [var.public_security_group_id]

  }
  egress {
    from_port   = var.from_port_e_private
    to_port     = var.to_port_e_private
    protocol    = var.protocol_e_private
    cidr_blocks = var.cidr_blocks_e_private
  }
}

resource "aws_security_group" "nhom16_security_group_public" {
  vpc_id      = var.vpc_id
  tags = {
    Name = "nhom16_security_group_public"
  }
  ingress {
      from_port       = var.from_port_in_public
      to_port         = var.to_port_in_public
      protocol        = var.protocol_in_public
      cidr_blocks     = var.cidr_blocks_in_public

  }
  egress {
    from_port   = var.from_port_e_public
    to_port     = var.to_port_e_public
    protocol    = var.protocol_e_public
    cidr_blocks = var.cidr_blocks_e_public
  }
}
