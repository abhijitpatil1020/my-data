variable "REGION" {
    default = "us-east-1"
  
}
variable "AMI" {
    type = map(string)
    default = {
        us-east-1 = "ami-084568db4383264d4"
        us-east-2 = "ami-04f167a56786e4b09"

    }
  
}
variable "AZ" {
    default = "us-east-1a"
  
}
variable "INSTTYPE" {
    default = "t2.micro"

}
variable "KEY" {
    default = "cli-key"
  
}
variable "USER" {
    default = "ubuntu"
  
}
