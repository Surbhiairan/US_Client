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





GET collection for User 

GET  - http://localhost:5000/api/user/1/collections
Response 
[
    {
        "id": 5,
        "userId": 1,
        "collectionTitle": "test Collection",
        "collectionText": "Description ",
        "collectionImage": "https://s3.amazonaws.com/postcurve/1552548566902.png",
        "createDate": "2019-03-14 12:59:28",
        "updateDate": null,
        "createdBy": "Test User",
        "updatedBy": null
    },
    {
        "id": 6,
        "userId": 1,
        "collectionTitle": "test Collection",
        "collectionText": "Description ",
        "collectionImage": "https://s3.amazonaws.com/postcurve/1552550712412.png",
        "createDate": "2019-03-14 13:35:14",
        "updateDate": null,
        "createdBy": "Test User",
        "updatedBy": null
    }
]



Update a collection  -- 
PATCH -- http://localhost:5000/api/collection/collectionId 

Req  - 
{

	"user_id" : "1",
	"collection_image" : "data:image/png;base64,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",
	  "collection_title" : "test Collection",
	  "collection_text" : "Description "
}

Res -- 
{
    "id": 5,
    "userId": 1,
    "collectionTitle": "test Collection 2",
    "collectionText": " Test Description ",
    "collectionImage": "https://s3.amazonaws.com/postcurve/1552555781293.png",
    "createDate": "2019-03-14 12:59:28",
    "updateDate": "2019-03-14 15:00:55",
    "createdBy": "Test User",
    "updatedBy": "Test User"
}