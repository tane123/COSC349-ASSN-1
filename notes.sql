CREATE TABLE 'users'{
    'username' varchar(25)
    'pin' int(4)
    PRIMARY KEY('username')
}
CREATE TABLE 'notes' {
    'username' varchar(25)
    'note' varchar(255)
    FOREIGN KEY('username') REFERENCES 'users' 
    
}

INSERT INTO 'notes'('admin',1234)