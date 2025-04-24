resource "aws_security_group" "nhom16_security_group" {
  vpc_id      = var.vpc_id_value
  name        = var.security_group_name
  description = var.description
  tags = {
    Name = "nhom16_security_group"
  }

  dynamic "ingress" {
    for_each = var.ingress_rules
    content {
      from_port       = ingress.value.from_port
      to_port         = ingress.value.to_port
      protocol        = ingress.value.protocol
      cidr_blocks     = ingress.value.cidr_blocks
      security_groups = ingress.value.source_security_group
    }
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


