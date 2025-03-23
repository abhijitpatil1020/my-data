resource "aws_instance" "webapp" {
    ami = var.AMI[var.REGION]
    instance_type = var.INSTTYPE
    key_name = aws_key_pair.cli.id
   vpc_security_group_ids = [aws_security_group.testing_sg.id]
    availability_zone = var.AZ
    associate_public_ip_address = true
    tags = {
        "Name" = "webapp"
        "project" = "Linux_app"
    }
    provisioner "file" {
        source = "web.sh"
        destination = "/tmp/web.sh"
      
    }
    provisioner "remote-exec" {
        inline = [ 
            "chmod +x /tmp/web.sh",
            "sudo /tmp/web.sh"
         ]
      
    }
    connection {
      user = var.USER
      host = self.public_ip
      private_key = file("cli")
    }
}
output "PubIP" {
    value = aws_instance.webapp.public_ip
  
}
output "PriIP" {
    value = aws_instance.webapp.private_ip
  
}
output "PubDNS" {
    value = aws_instance.webapp.public_dns
  
}