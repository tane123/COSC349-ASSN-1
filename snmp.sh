
#!/bin/sh
sudo apt-get install snmpd libsnmp-dev
sudo cp /etc/snmp/snmpd.conf /etc/snmp/snmpd.bak
sudo sh -c "echo 'rocommunity Str0ngC0mmunity 192.168.2.13' > /etc/snmp/snmpd.conf

sudo systemctl restart snmpd.service

sudo ufw allow snmp
sudo ufw reload
sudo systemctl enable snmpd.service

