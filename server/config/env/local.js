module.exports = {
    env: 'local',
    port: process.env.PORT || 8080,
    db: {
     // "uri": "mysql://surbhi:root_Root1@localhost:3306/post_curve",
       "uri": "mysql://root@localhost:3306/gichub",
      "connectionLimit": 100,
      "acquireTimeout": 100000,
      "connectTimeout": 100000
    },
    aws:{
      key : 'AKIAIC4K2CVALZPF2FDA',
      secret : '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',
      imageUrl : "https://s3.amazonaws.com/",
      bucketName : "postcurve"
    },
    emailGun : {
      'API_KEY' : 'ca4c8151f467eb6e7041fe23db09c8df-e51d0a44-6d185f75',
      'DOMAIN' : 'sandboxd4a8eefe458d44b4a61f9c72732922cb.mailgun.org',
      'from' : 'surbhiairan1@gmail.com',      
    },
    webPush : {
      publicVapidKey : "BMETZJpEm8onr-zpGe-ux7HXOjn9erWuCf8cWmabvJ4t2TQv97hGM7fgokjLqMAZmglnwqU5dMxaE94K6hnOGZg",
      privateVapidKey : "z2aZovPk3CIIYm_TyOcxI0KFPXzL9axAKTMGMWFEjpQ"
    },
    secret:"This is a post curve app",
    logging: {
      logToFile: process.env.LOGFILEPATH ? true : false,
      logFilePath: process.env.LOGFILEPATH || "../logs",
      logToConsole: true,
      logHTTPToFile: process.env.HTTPLOGFILEPATH ? true : false,
      logHTTPToConsole: true
    }
  };
  
