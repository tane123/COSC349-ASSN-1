USE my_database;
Drop TABLE IF EXISTS users;
Drop TABLE IF EXISTS notes;
CREATE TABLE users (
    username varchar(25),
    pin int(4),
    PRIMARY KEY(username),
);

CREATE TABLE notes (
    PRIMARY KEY (noteId),
    username varchar(25) NOT NULL,
    note varchar(255) NOT NULL,
    subject varchar(255) NOT NULL,
    noteId int NOT NULL AUTO_INCREMENT,
    FOREIGN KEY(username) REFERENCES users(username)
    
);


 INSERT INTO users VALUES ('admin',1234);