#!/bin/sh
sudo apt-get update
sudo apt-get install -y autoconf gcc libc6 make wget unzip apache2 php libapache2-mod-php7.2 libgd-dev
cd /tmp
wget -O nagioscore.tar.gz https://github.com/NagiosEnterprises/nagioscore/archive/nagios-4.4.5.tar.gz
tar xzf nagioscore.tar.gz
cd /tmp/nagioscore-nagios-4.4.5/
sudo ./configure --with-httpd-conf=/etc/apache2/sites-enabled
cd /tmp/nagioscore-nagios-4.4.5/
sudo make all
sudo make install-groups-users
sudo usermod -a -G nagios www-data
sudo make install
sudo make install-daemoninit
sudo make install-commandmode
sudo make install-config
sudo make install-webconf
sudo a2enmod rewrite
sudo a2enmod cgi
sudo ufw allow Apache
sudo ufw reload
sudo mkdir /usr/local/nagios/
sudo mkdir /usr/local/nagios/etc/
sudo touch /usr/local/nagios/etc/htpasswd.users
sudo htpasswd -b -c /usr/local/nagios/etc/htpasswd.users admin admin
sudo systemctl restart apache2.service
sudo systemctl start nagios.service
