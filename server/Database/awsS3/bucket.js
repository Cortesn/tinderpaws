// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-example-creating-buckets.html
// use this instead... returns public URL
// https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascript/example_code/s3/s3_upload.js
import AWS from 'aws-sdk'
import * as fs from 'fs';

// Create S3 service object
// lock the version 2006-03-01 is current
var s3 = new AWS.S3({apiVersion: '2006-03-01'});

// add object to S3 bucket
const uploadImage = (file) => {
    const fileStream = fs.createReadStream(file.path);
    // console.log(fileStream)
    // Create an object and upload it to the Amazon S3 bucket.
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: file.filename,
        Body: fileStream
    }
    // upload object and get the public url string back (.Location)
    return s3.upload(params).promise();   
}

// remove object from S3 bucket
const deleteImage = (key) => {
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: key
    }
    return s3.deleteObject(params).promise();
}

export { uploadImage, deleteImage }

