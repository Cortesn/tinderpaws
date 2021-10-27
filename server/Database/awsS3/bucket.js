// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-example-creating-buckets.html
// ** Upload an existing object to an Amazon S3 bucket
// https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/s3/src/s3_upload_object.js

import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "./s3Client.js"
import * as fs from 'fs';


const uploadImage = async (file) => {
    const fileStream = fs.createReadStream(file.path);
    // console.log(fileStream)
    // Create an object and upload it to the Amazon S3 bucket.
    const params = {
        Bucket:"tinder-paws-images",
        Key: file.filename,
        Body: fileStream
    }
    
    try {
        const data = await s3Client.send(new PutObjectCommand(params))
        // console.log("Success Data: ", data);
        if (data){
            // remove the file from local storage
            fs.unlink(file.path, (err) => {
                if (err){
                    console.log(err)
                }
            })
            return data;
        }
        // return results; // For unit tests.
    } catch (err) {
        console.log("Error", err);
    }
}

export default uploadImage

