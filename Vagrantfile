

Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/xenial64"
  
    config.vm.define "webserver" do |webserver|
      webserver.vm.hostname = "webserver"
      
      webserver.vm.network "forwarded_port", guest: 80, host: 5050, host_ip: "127.0.0.1"
      
      webserver.vm.network "private_network", ip: "192.168.2.11"
  
      webserver.vm.synced_folder ".", "/vagrant", owner: "vagrant", group: "vagrant", mount_options: ["dmode=775,fmode=777"]
  
      webserver.vm.provision "shell", inline: <<-SHELL
        apt-get update
        apt-get install -y apache2 php libapache2-mod-php php-mysql
        sudo apt install npm
 	cd /var/www/
	npm install
              
        cp /vagrant/test-website.conf /etc/apache2/sites-available/
	cp -r /vagrant/www/ /var/
        a2ensite test-website
        a2dissite 000-default
        service apache2 reload
      SHELL
    end
  
    config.vm.define "dbserver" do |dbserver|
      dbserver.vm.hostname = "dbserver"
      dbserver.vm.network "private_network", ip: "192.168.2.12"
      dbserver.vm.network "forwarded_port", guest: 3036, host: 3036, host_ip: "127.0.0.1"
      dbserver.vm.network "forwarded_port", guest: 80, host: 5052, host_ip: "127.0.0.1"

      dbserver.vm.synced_folder ".", "/vagrant", owner: "vagrant", group: "vagrant", mount_options: ["dmode=775,fmode=777"]
      
      dbserver.vm.provision "shell", inline: <<-SHELL
        apt-get update
        
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

    config.vm.define "adminserver" do |adminserver|
        adminserver.vm.hostname = "adminserver"

        adminserver.vm.network "private_network", ip: "192.168.2.13"
        adminserver.vm.network "forwarded_port", guest: 80, host: 5051, host_ip: "127.0.0.1"
        
        adminserver.vm.provision "shell", inline: <<-SHELL
          apt-get update 
	  debconf-set-selections <<< "phpmyadmin	phpmyadmin/dbconfig-install boolean false"
	debconf-set-selections <<< "phpmyadmin	phpmyadmin/setup-password password test"
	debconf-set-selections <<< "phpmyadmin	phpmyadmin/app-password-confirm password test"
	debconf-set-selections <<< "phpmyadmin	phpmyadmin/password-confirm password test"
	debconf-set-selections <<< "phpmyadmin	phpmyadmin/reconfigure-webserver multiselect apache2"
	cat /vagrant/database.php > /etc/phpmyadmin/config.inc.php


	apt install -y apache2
	apt-get --no-install-recommends install -y phpmyadmin
	cat /vagrant/hosts >> /etc/hosts

        SHELL
    end
          
  
  end
  
  