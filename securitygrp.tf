resource "aws_security_group" "testing_sg" {
    name = "testing_sg"
    description = "for terraform testing"
    tags = {
      name = "allow"
    }
  
}
resource "aws_vpc_security_group_ingress_rule" "allow_ssh" {
    security_group_id = aws_security_group.testing_sg.id
    cidr_ipv4 = "0.0.0.0/0"
    from_port = 22
    to_port = 22
    ip_protocol = "tcp"
  
}
resource "aws_vpc_security_group_ingress_rule" "allow_http" {
    security_group_id = aws_security_group.testing_sg.id
    cidr_ipv4 = "0.0.0.0/0"
    from_port = 80
    to_port = 80
    ip_protocol = "tcp"
}
resource "aws_vpc_security_group_ingress_rule" "allow_https" {
    security_group_id = aws_security_group.testing_sg.id
    cidr_ipv4 = "0.0.0.0/0"
    from_port = 443
    to_port = 443
    ip_protocol = "tcp"
}
resource "aws_vpc_security_group_egress_rule" "allow_all_traffic_ipv4" {
    security_group_id = aws_security_group.testing_sg.id
    cidr_ipv4 = "0.0.0.0/0"
    ip_protocol = "-1"

  
}