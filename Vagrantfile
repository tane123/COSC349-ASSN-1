
# This will configure a vagrant VM that acts as a web server
Vagrant.configure("2") do |config|
    # Type of the machine being used
    config.vm.box = "ubuntu/xenial64"

    # This line and below defines the VM's settings
    config.vm.define "webserver" do |webserver|

      # name of the web server	
      webserver.vm.hostname = "webserver"
      
      # The forwarded ports and the host's IP
      webserver.vm.network "forwarded_port", guest: 80, host: 5050, host_ip: "127.0.0.1"

      # The IP address of the machine within the internal network
      webserver.vm.network "private_network", ip: "192.168.2.11"
      
      # The folders that are shared between host and guest machines
      webserver.vm.synced_folder ".", "/vagrant", owner: "vagrant", group: "vagrant", mount_options: ["dmode=775,fmode=777"]

      # Commands that will run on provisioning of this machine
      webserver.vm.provision "shell", inline: <<-SHELL
	# These two lines will get the name of all updated packages and install all of dependancies needed
        apt-get update
        apt-get install -y apache2 php libapache2-mod-php php-mysql
	
	# These lines will copy, enable, and reload the website so that we can access it on our host machine
 	cd /var/www/  
        cp /vagrant/test-website.conf /etc/apache2/sites-available/
	cp -r /vagrant/www/ /var/
        a2ensite test-website
        a2dissite 000-default
        service apache2 reload
      SHELL
    end
  
# This will configure a vagrant VM that acts as a database server
    config.vm.define "dbserver" do |dbserver|
      # name of the web server	
      dbserver.vm.hostname = "dbserver"

      # The forwarded ports and the host's IP
      dbserver.vm.network "private_network", ip: "192.168.2.12"

      # dbserver.vm.network "forwarded_port", guest: 80, host: 5052, host_ip: "127.0.0.1"

      # The folders that are shared between host and guest machines
      dbserver.vm.synced_folder ".", "/vagrant", owner: "vagrant", group: "vagrant", mount_options: ["dmode=775,fmode=777"]

      # Commands that will run on provisioning of this machine
      dbserver.vm.provision "shell", inline: <<-SHELL
	# Gets all the packages needed
        apt-get update
        # These lines will do a headless install of mysql using deb-set-collections.
        # deb-set-collections is useful in headless install when there is a GUI installer
        # It will install the package using the options set, 
        # These lines also create the users, passwords and databases required for the website
        export MYSQL_PWD='admin'
        echo "mysql-server mysql-server/root_password password $MYSQL_PWD" | debconf-set-selections 
        echo "mysql-server mysql-server/root_password_again password $MYSQL_PWD" | debconf-set-selections
        apt-get -y install mysql-server
        echo "CREATE DATABASE my_database" | mysql
        echo "CREATE USER 'webuser'@'%' IDENTIFIED BY 'admin';" | mysql
        echo "GRANT ALL PRIVILEGES ON my_database.* TO 'webuser'@'%'" | mysql
        export MYSQL_PWD='admin'
        cat /vagrant/notes.sql | mysql -u webuser my_database
        sed -i'' -e '/bind-address/s/127.0.0.1/0.0.0.0/' /etc/mysql/mysql.conf.d/mysqld.cnf
        service mysql restart
      SHELL
    end

# This will configure a vagrant VM that acts as a admin server
    config.vm.define "adminserver" do |adminserver|
        adminserver.vm.hostname = "adminserver"

        adminserver.vm.network "private_network", ip: "192.168.2.13"
        adminserver.vm.network "forwarded_port", guest: 80, host: 5051, host_ip: "127.0.0.1"
      adminserver.vm.provision "shell", inline: <<-SHELL

	apt install -y apache2 php libapache2-mod-php
	cat /vagrant/hosts >> /etc/hosts
	rm -f /var/www/html/index.html
	cp /vagrant/index.php /var/www/html/index.php
	sh /vagrant/nagios.sh

        SHELL
    end
          
  
  end
  
  