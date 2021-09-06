
# COSC349 Assignment 1
The Note Taker 5000 is a basic web application that provides simply yet elegant collaborative notes. This project uses Vagrant to automatically provision and install all dependencies needed for the website. 

To start the application Vagrant and Virtual Box must first be installed. 

Vagrant  and Virual Box can be installed  on MacOS by running:
```
$ brew cask install virtualbox
$ brew cask install vagrant
$ brew cask install vagrant-manager
```
Or windows by downloading and installing:
```
https://releases.hashicorp.com/vagrant/2.2.18/vagrant_2.2.18_x86_64.msi
```

After clone or download by these URLS:
```
# for when using git
git clone https://github.com/tane123/COSC349-ASSN-1.git

# or download and extract this file 
https://github.com/tane123/COSC349-ASSN-1/archive/refs/heads/main.zip
```

At which point move to the directory in which is saved and run:
```
$ vagrant up
```

This will automatically provison and install all of the VM's for use. There are three VM's which all serve their own purpose.

### Database server:  
Acts a database for the internal storage of users passwords and notes. The notes.sql file is where the databases are defined, so if something needs to be changed it can easily be accessed outside of the Virtual Machine environment.

- This can be access through sshing into it and running the mysql command. The password has been set already so no input is required. Just run: 
```$ vagrant up```
```$ mysql -uroot -p ```

### Webserver: 
Acts as a webserver for the main web application. It uses a LAMP stack to interact with the database for user authentication and note storage. The backend is prominently written in PHP using the mysqli plugin to easily interact.

* This can be accessed by using this URL:
```http://localhost:5050/```
* Its a simple as signing up, logging in and up adding a note. Here is a video that shows the proccess:
* Or use the defualt username and pin
* Username: ```admin```
* Pin: ```1234```
	

### Admin Server: 
This server acts as administration for the database. Uses a thirdparty open-source PHP file called Adminer. This could be a point of improvement by tailoring a website directly to context of this application.
* The admin server can be access via web browser through this link:
		```http://localhost:5051/```
* It should have the default values as shown below. Username is ```webuser``` and the password is  ```admin``` 


![image](https://user-images.githubusercontent.com/19453292/132167688-af64af3c-7592-4e54-84da-86bdda61913f.png)

Here is some screenshots of the app and a video of how to use it:

### Main Page:
<img src="https://user-images.githubusercontent.com/19453292/132168235-e33ff70a-843c-4250-9c95-37eb8f0dc5e9.png" alt="drawing" width="1000"/>

### Login Modal:
<img src="https://user-images.githubusercontent.com/19453292/132168281-e7c3dbd7-2cf6-4d92-96a9-4f61c901d14f.png" alt="drawing" width="1000"/>

### Dashboard and Note View:
<img src="https://user-images.githubusercontent.com/19453292/132168333-335e52b9-6760-48d7-8e54-2695cec106ce.png" alt="drawing" width="1000"/>

### Video
[![](https://res.cloudinary.com/marcomontalbano/image/upload/v1630909380/video_to_markdown/images/youtube--hbHe_6ChSqo-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://youtu.be/hbHe_6ChSqo "")


