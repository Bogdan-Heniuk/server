import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";

import multerS3 from "multer-s3";
import config from "../config.js";

const s3 = new S3Client({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: config.s3_access_key,
    secretAccessKey: config.s3_secret_access_key,
  },
});

export const uploadWithSaving = multer({
  storage: multerS3({
    s3: s3,
    bucket: "djinni",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

export const uploadWithoutSaving = multer();
