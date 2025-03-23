#/bin/bash
apt update
apt install wget unzip apache2 -y
systemctl start apache2
systemctl enable apache2
wget https://www.tooplate.com/zip-templates/2079_garage.zip
unzip -o 2079_garage.zip
cp -r 2079_garage/* /var/www/html/
systemctl restart apache2