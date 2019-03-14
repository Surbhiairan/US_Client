const AWS = require('aws-sdk');
const config = require('../config/env');
AWS.config.update({
    accessKeyId: config.aws.key,
    secretAccessKey: config.aws.secret
});
const s3bucket = new AWS.S3({ params: { Bucket: config.aws.bucketName } });

class AWSUtil {

    static deleteImage(imageUrl) {
        console.log("URL", imageUrl)


        return new Promise((resolve, reject) => {
            if (imageUrl && imageUrl.indexOf("http") > -1) {
                let key = imageUrl.substring(imageUrl.lastIndexOf('/') + 1, imageUrl.length);
                var s3Data = {
                    Key: key
                };
                s3bucket.deleteObject(s3Data, function (perr, pres) {
                    if (perr) {
                        reject(perr)
                    } else {
                        let url = config.aws.imageUrl + config.aws.bucketName + "/" + key;
                        resolve(url);
                    }
                });
            }else{
                resolve();
            }
        });
    }

    static updateProfile(image, imageUrl) {
        return new Promise((resolve, reject) => {
            AWSUtil.deleteImage(imageUrl).then((deletedImage) => {
                let imageName = new Date().getTime() + ".png";
                AWSUtil.uploadImage(image, imageName).then(imageURL => {
                    resolve(imageURL);
                });
            })
                .catch(err => {
                    reject(err);
                })
        });
    }

    static uploadImage(img, name) {
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
                    let url = config.aws.imageUrl + config.aws.bucketName + "/" + name;
                    resolve(url);
                }
            });

        })
    }
}

module.exports = AWSUtil;