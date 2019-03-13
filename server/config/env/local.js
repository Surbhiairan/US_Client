module.exports = {
    env: 'local',
    port: process.env.PORT || 8080,
    db: {
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
    secret:"This is a post curve app",
    logging: {
      logToFile: process.env.LOGFILEPATH ? true : false,
      logFilePath: process.env.LOGFILEPATH || "../logs",
      logToConsole: true,
      logHTTPToFile: process.env.HTTPLOGFILEPATH ? true : false,
      logHTTPToConsole: true
    }
  };
  
