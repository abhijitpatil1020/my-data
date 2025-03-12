FROM ubuntu:latest
LABEL "Author"="Abhijit"
LABEL "Project"="First_Image"
RUN apt update && apt install git -y
RUN apt install apache2 -y
CMD [ "/usr/sbin/apache2ctl", "-D", "FOREGROUND" ]
EXPOSE 80
WORKDIR /var/www/html
VOLUME [ "/var/log/apache2" ]
ADD web.tar.gz /var/www/html/
