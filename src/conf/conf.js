const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinyMCE_Api_key: String(import.meta.env.VITE_TINY_MCE_API_KEY),
    couldinary_cloud_name: String(import.meta.env.VITE_CLOUD_NAME),
    couldinary_Api_key: String(import.meta.env.VITE_CLOUDINARY_API_KEY),
    coulinary_api_secret: String(import.meta.env.VITE_CLOUDINARY_API_SECRET),
    coulinary_preset: String(import.meta.env.VITE_CLOUDINARY_PRESET),
}
// there was a name issue with the import.meta.env.VITE_APPWRITE_URL, it was later fixed in debugging video

export default conf