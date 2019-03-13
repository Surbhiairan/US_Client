1) create a DB with the name (gichub) for user root:root or adjust in config/local.js  accordingly.
2) run following command to adjust tables directly into DB

node server/script/index.js



--------------------------------------------User ------------------------------ 
POST -------------http://localhost:5000/api/user/authenticate ----------- Login 
    req - 
        {
            "first_name" : "anik",
            "last_name" : "pandey",
            "email" : "anik.pandey@gmail.com",
            "role" : "agent",
            "password" : "anik@456"
        }

    response- 
        {
            "id": 1,
            "firstName": "anik",
            "lastName": "pandey",
            "email": "anik.pandey@gmail.com",
            "role": "agent",
            "token": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiYW5payIsImxhc3ROYW1lIjoicGFuZGV5IiwiZW1haWwiOiJhbmlrLnBhbmRleUBnbWFpbC5jb20iLCJyb2xlIjoiYWdlbnQifQ.QvCuFH9mM2Fe9v3101tbd9ecigF0_nbHfQBZRo0V3j4"
        }

POST -------------http://localhost:5000/api/user ----------- Register
    req - 
        {
            "first_name" : "Sada",
            "last_name" : "mandal",
            "email" : "mandal.sadanand02@gmail.com",
            "role" : "agent",
            "password" : "sada@123"
        }
    res - 
        {
            "fieldCount": 0,
            "affectedRows": 1,
            "insertId": 2,
            "serverStatus": 2,
            "warningCount": 0,
            "message": "",
            "protocol41": true,
            "changedRows": 0
        }

