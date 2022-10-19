exports.PORT = process.env.PORT;
exports.API_PREFIX = process.env.API_PREFIX;
exports.CLIENT_ID = process.env.CLIENT_ID;
exports.FB_URL = process.env.FB_URL;
exports.APPROVED = process.env.APPROVED_STATUS;
exports.SECRET_KEY = process.env.SECRET_KEY;
exports.MULTER_UPLOAD_COUNT = process.env.MULTER_UPLOAD_COUNT;
exports.LOGIN_TYPE = process.env.LOGIN_TYPE;

//database connection credentials
exports.USER_NAME = process.env.USER_NAME
exports.PASSWORD = process.env.PASSWORD
exports.DATABASE = process.env.DATABASE
exports.HOST =  process.env.HOST
exports.DIALECT = process.env.DIALECT
exports.DB_PORT = process.env.DB_PORT

//twilio.com credentials
exports.ACCOUNT_SID = process.env.ACCOUNT_SID;
exports.AUTH_TOKEN = process.env.AUTH_TOKEN;
exports.SERVICE_ID = process.env.SERVICE_ID;

//aws S3 credentials
exports.BUCKET= process.env.S3_BUCKET_NAME
exports.ACCESS_KEY_ID = process.env.S3_ACCESS_KEY
exports.SECRET_ACCESS_KEY = process.env.S3_SECRET_KEY
exports.REGION = process.env.S3_REGION
exports.S3_DOCUMENT_FOLDER = process.env.S3_USERS_DOCUMENT_FOLDER
exports.S3_EVENTS_FOLDER = process.env.S3_EVENTS_FOLDER

//nodemailer credentails
exports.EMAIL_HOST = process.env.EMAIL_HOST,
exports.EMAIL_PORT =process.env.EMAIL_PORT
exports.EMAIL_USERNAME =process.env.EMAIL_USERNAME
exports.EMAIL_PASSWORD=process.env.EMAIL_PASSWORD
exports.EMAIL_FROM = process.env.EMAIL_FROM

//GOOGLE-API-KEY-CONFIGURE
exports.GOOGLE_API_KEY = process.env.GOOGLE_API_KEY 
exports.GOOGLE_MAP_ADDRESS_URL = process.env.GOOGLE_MAP_ADDRESS_URL
