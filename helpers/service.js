const fetch = require("node-fetch");
const {GOOGLE_API_KEY,GOOGLE_MAP_ADDRESS_URL} = require("../helpers/constant")

exports.getAddress = async (lat,long) => {
	const response = await fetch(`${GOOGLE_MAP_ADDRESS_URL}=${lat},${long}&key=${GOOGLE_API_KEY}`);
	const { results } = await response.json();
	if (results.length == 0) return { address: null };
	return results[0].formatted_address
};

exports.radomOtp = Math.floor(100000 + Math.random() * 900000);