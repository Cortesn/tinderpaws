import { S3Client } from "@aws-sdk/client-s3";
// might need to set up config/env for secret & access keys
// region not setting in config file... hard code here
const REGION = 'us-west-2'

const s3Client = new S3Client({region: REGION})

export default s3Client