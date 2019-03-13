const AWS = require('aws-sdk');
const config = require('../config/env');
AWS.config.update({
    accessKeyId: config.aws.key,
    secretAccessKey: config.aws.secret
});
const s3bucket = new AWS.S3({ params: { Bucket: config.aws.bucketName } });

class AWSUtil {

    static deleteImage(name){
        return new Promise((resolve, reject) => {
            var s3Data = {
                Key: name
            };
            s3bucket.deleteObject(s3Data, function (perr, pres) {
                
                if (perr) {
                    reject(perr)
                } else {
                    let url = config.aws.imageUrl+config.aws.bucketName+"/"+name;
                    resolve(url);
                }
            });

        }) 
    }

    static uploadImage(img,name) {
        return new Promise((resolve, reject) => {
            var buf = new Buffer.from(img.replace(/^data:image\/\w+;base64,/, ""), 'base64');
            var s3Data = {
                Key: name,
                Body: buf,
                ContentEncoding: 'base64',
                ContentType: 'image/jpeg',
                ACL: 'public-read',
            };
            s3bucket.putObject(s3Data, function (perr, pres) {
                
                if (perr) {
                    reject(perr)
                } else {
                    let url = config.aws.imageUrl+config.aws.bucketName+"/"+name;
                    resolve(url);
                }
            });

        })
    }
}

module.exports = AWSUtil;