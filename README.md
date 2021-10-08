
# COSC349 Assignment 1
The Note Taker 5000 is a basic web application that provides simply yet elegant collaborative notes. This project is already deployed to AWS.

The application is built with two EC2 instances and two other services, RDS and S3, that handle note storage and file storage.
Below is an explanantion of how the istances are work together to provide an identical exeperience to if it were running on local machines.
To use this application please, create a AWS account and recreate the instances as shown on the diagram below.

![image](https://user-images.githubusercontent.com/19453292/136517903-66e9b4b8-f8bf-4970-b906-aa07645a4071.png)

Create it so that the EC2 instance has access to the S3 bucket by using IAM authentication. This will allow for easy syncing with the S3 bucket to the EC3 storage. All machines must be set to public so that we can access them outside of another instance. The database is the most important one.

To start login into the Websever EC2 instance and install all dependancies needed:

```sudo apt-get update```
```apt-get install -y apache2 php libapache2-mod-php php-mysql```

Do the same on the Admin server.
From here install the aws cli tool by running:

```curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"```
```unzip awscliv2.zip```
```sudo ./aws/install```

From here sync all data needed from the S3 block storage using:

```aws sync <s3 url> /var```

And restart the apache service using:

```service apache2 restart```

All php files that query the database using the mysqli file will have to be changed to your RDS instance

Similar to this:
https://github.com/tane123/COSC349-ASSN-1/blob/df71078f3a7bf1aab33a5acbbf05c233536a551a/www/html/dbconnect.php#L5

From here the website should work as intended.

### RDS Instance :  
Acts a database for the internal storage of users passwords and notes. The notes.sql file is where the databases are defined, so if something needs to be changed it can easily be accessed outside of the Virtual Machine environment.
The RDS instance can be mutated by using the mysql-client.

This can be installed by running

```sudo apt-get install mysql-client```

From here you can run 

```mysql -h <hostAddress> -u <username> -p```

From there enter your password and make changes as needed.
	
### Webserver: 
Acts as a webserver for the main web application. It uses a LAMP stack to interact with the database for user authentication and note storage. The backend is prominently written in PHP using the mysqli plugin to easily interact.

* This can be accessed by using this URL: [Note Taker 500](http://3.26.26.212/index.html)
* Its a simple as signing up, logging in and up adding a note. Here is a video that shows the proccess:
* Or use the defualt username and pin
* Username: ```admin```
* Pin: ```1234```
	

### Admin Server: 
This server acts as administration for the database. Uses a thirdparty open-source PHP file called Adminer. This could be a point of improvement by tailoring a website directly to context of this application.
* The admin server can be access via web browser through this link: [Admin Server](http://54.252.191.114/?server=db-cosc349-suppanut.chefvynnvuzl.ap-southeast-2.rds.amazonaws.com&username=admin&db=my_database)
* It should have the default values as shown below. Username is ```admin``` and the password is  ```test1234``` 


### Modifications:
If any modifications are made the command below can be run to reload and reprovison the website:
This should be done from the Webserver EC2 instance. This will reupload and provision the website by grabbing it from the S3 storage. 

```aws s3 sync s3://<name of your bucket> /var/```
```sudo service apache2 restart```

Here is some screenshots of the app and a video of how to use it:

### Main Page:
<img src="https://user-images.githubusercontent.com/19453292/132168235-e33ff70a-843c-4250-9c95-37eb8f0dc5e9.png" alt="drawing" width="500"/>

### Dashboard and Note View:
<img src="https://user-images.githubusercontent.com/19453292/132168333-335e52b9-6760-48d7-8e54-2695cec106ce.png" alt="drawing" width="500"/>

### Video
[Youtube Link](https://youtu.be/hbHe_6ChSqo)]


