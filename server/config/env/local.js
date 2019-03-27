module.exports = {
    env: 'local',
    port: process.env.PORT || 8080,
    db: {
     // "uri": "mysql://surbhi:root_Root1@localhost:3306/post_curve",
       "uri": "mysql://root:root@localhost:3306/gichub",
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
      'API_KEY' : '',
      'DOMAIN' : '',
      'from' : 'sada.mandal101@gmail.com',      
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
  
