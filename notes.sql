USE fvision;
Drop TABLE IF EXISTS users;
Drop TABLE IF EXISTS notes;
CREATE TABLE users (
    username varchar(25),
    pin int(4),
    PRIMARY KEY(username)
);

CREATE TABLE notes (
    username varchar(25),
    note varchar(255) NOT NULL,
    FOREIGN KEY(username) REFERENCES users(username)
    
);


 INSERT INTO users VALUES ('admin',1234);