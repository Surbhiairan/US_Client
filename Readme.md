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


POST ----------------------http://localhost:5000/api/userprofile ----------- Create Profile
req -- {
	    "user_id" : "1",
		"profile_img" : ",
		"bio" : "",
	     "f_link" : "",
	    "i_link" : "",
	    "t_link": "",
	    "y_link" : ""
}

res --- 
    {
        "id": 20,
        "profileImg": "https://s3.amazonaws.com/postcurve/1552485323044.png",
        "bio": null,
        "fLink": null,
        "tLink": null,
        "yLink": null,
        "createDate": "2019-03-13 19:25:23",
        "updateDate": null,
        "createdBy": "Test User",
        "updatedBy": null
    }


get Profile by user ID : 

GET http://localhost:5000/api/userprofile/:userID


create a new collection ; 
