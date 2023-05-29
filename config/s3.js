import { config } from 'dotenv';
import { S3Client } from '@aws-sdk/client-s3';
config();
// const configS3 = {
//   region: process.env.S3_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID, //
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// };
// const s3 = new S3Client(configS3);
//
// export default s3;

// const { S3Client } = require("@aws-sdk/client-s3");

const configS = {
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};
const s3 = new S3Client(configS);

export default s3;
