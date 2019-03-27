module.exports = {
    env: 'local',
    port: process.env.PORT || 8080,
    db: {
      "uri": "mysql://postcurveUser:postcurve01@43.255.154.50:3306/postcurveDemo",
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
      'API_KEY' : '27ebc1d1e7703185ac096fe9003e2966-de7062c6-bee4baf4',
      'DOMAIN' : 'sandboxe504238a8eab4f49a1750d1dce96609f.mailgun.org',
      'from' : 'pandeyaniket546@gmail.com',      
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
  
