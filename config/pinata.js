 const axios = require("axios");
const FormData = require("form-data");
 
exports. uploadToPinata = async (file) => {
    try {
        if (!file || !file.buffer) {
            throw new Error("File buffer missing. Check multer config.");
        }
 
        const formData = new FormData();
 
        formData.append("file", file.buffer, {
            filename: file.originalname || "upload.png",
            contentType: file.mimetype || "application/octet-stream",
        });
 
        const response = await axios.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            formData,
            {
                maxBodyLength: Infinity,
                headers: {
                    ...formData.getHeaders(),
                    pinata_api_key: process.env.PINATA_API_KEY,
                    pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
                },
            }
        );
 
        const ipfsHash = response?.data?.IpfsHash;
 
        if (!ipfsHash) {
            throw new Error("Pinata did not return IpfsHash");
        }
 
        return {
            hash: ipfsHash,
            url: `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
        };
    } catch (err) {
        console.error("PINATA ERROR:", err?.response?.data || err.message);
        throw new Error("Failed to upload to Pinata");
    }
};
 