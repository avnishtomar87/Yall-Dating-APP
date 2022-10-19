const S3 = require("aws-sdk/clients/s3");
const { BUCKET, ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION } = require("./constant.js");
const s3 = new S3({
	Bucket: BUCKET,
	accessKeyId: ACCESS_KEY_ID,
	secretAccessKey: SECRET_ACCESS_KEY,
	region: REGION,
});

exports.uploadToS3 = (file, folderToUpload) => {
	const nameExtension = file.originalname.split(".");
	const fileName = nameExtension[0];
	const fileExtension = nameExtension[1];
	const params = {
		Bucket: BUCKET,
		Key: `${folderToUpload}/${fileName}_${Date.now().toString()}.${fileExtension}`,
		ContentType: file.mimetype,
		Body: file.buffer,
		ACL: "public-read",
	};
	return s3.upload(params).promise();
};

exports.deleteFromS3 = fileUrl => {
	const params = {
		Bucket: BUCKET,
		Key: fileUrl,
	};
	return s3.deleteObject(params).promise();
};

exports.formatUploadImage = file => {
	file.originalname = file.name;
	file.buffer = file.data;
	return file;
};