import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(config.appwriteEndpoint)
            .setProject(config.appwriteProjectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client); 
    }
    async createPost({title, slug, featured_img, status, userID, content="test"}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featured_img,
                    status,
                    userID,
                }
            )
        } catch (error) {
            console.log("Appwwrite service :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featured_img, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featured_img,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);            
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            )
            return true            
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            )            
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            const posts =  await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                queries
            )
            if (posts) return posts
            return null            
        } catch (error) {
            //console.log("Appwrite service :: getPosts :: error", error);
            return null
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBuckedID,
                ID.unique(),
                file
            )            
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
        }
    }

    async deleteFile(fileID){
        try {
            await this.bucket.deleteFile(
                config.appwriteBuckedID,
                fileID
            )    
            return true        
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileID){
        return this.bucket.getFilePreview(config.appwriteBuckedID, fileID)
    }
}

const service = new Service();
export default service;
