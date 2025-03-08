const config = {
    appwriteEndpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteCollectionID: String(import.meta.env.VITE_APPWRITE_COLLECTIONS_ID),
    appwriteBuckedID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteDatabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
}

export default config