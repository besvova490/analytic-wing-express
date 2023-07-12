import aws from 'aws-sdk';

export const s3 = new aws.S3({
  accessKeyId: process.env.EXPRESS_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.EXPRESS_APP_AWS_SECRET_KEY,
  region: process.env.EXPRESS_APP_AWS_REGION,
});
