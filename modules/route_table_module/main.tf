resource "aws_route_table" "nhom16_route_table_private" {
  vpc_id = var.vpc_id_value
  tags = {
    Name = "nhom16_route_table_private"
  }
}

resource "aws_route_table" "nhom16_route_table_public" {
  vpc_id = var.vpc_id_value
  tags = {
    Name = "nhom16_route_table_public"
  }
}

resource "aws_route" "nhom16_route_private" {
  route_table_id         = var.route_table_private_id
  destination_cidr_block = var.destination_cidr_block_private
  gateway_id             = var.gateway_id_private
}

resource "aws_route_table_association" "nhom16_route_table_association_private" {
  subnet_id      = var.subnet_id_private
  route_table_id = var.route_table_private_id
}

resource "aws_route" "nhom16_route_public" {
  route_table_id         = var.route_table_public_id
  destination_cidr_block = var.destination_cidr_block_public
  gateway_id             = var.gateway_id_public
}
resource "aws_route_table_association" "nhom16_route_table_association_public" {
  subnet_id      = var.subnet_id_public
  route_table_id = var.route_table_public_id
}