resource "aws_key_pair" "cli" {
    key_name = var.KEY
    public_key = file("cli.pub") 
}