import conf from "../conf/conf";
import axios from "axios";


export const UploadFile = async (image) => {
  const url = `https://api.cloudinary.com/v1_1/${conf.couldinary_cloud_name}/image/upload`;
  const formData = new FormData();
  formData.append("file", image); // Add your file path
  formData.append("upload_preset", conf.coulinary_preset); // Replace with preset name

  const response = await axios.post(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data // Displays file URL and other details
};

export const DeleteImage = async (publicId) => {
  const cloudName = conf.couldinary_cloud_name;
  const apiKey = conf.couldinary_Api_key;
  const apiSecret = conf.coulinary_api_secret;

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

  const response = await axios.post(
    url,
    { public_id: publicId },
    { headers: { Authorization: `Basic ${auth}` } }
  );
  return response.data; // Displays file URL and other details
};
