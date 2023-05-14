import dotenv from 'dotenv'
dotenv.config()

const config = {
    development: {
        mongoUrl: process.env.MONGO_URL,
        port: process.env.PORT,
        jwtSecret: process.env.JWT_SECRET,
        s3_access_key: process.env.S3_ACCESS_KEY,
        s3_secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
    },
    test: {
        mongoUrl: process.env.TEST_MONGO_URL,
        port: process.env.PORT,
        jwtSecret: process.env.JWT_SECRET,
        s3_access_key: process.env.S3_ACCESS_KEY,
        s3_secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
    }
}

export default config[process.env.NODE_ENV || 'development']