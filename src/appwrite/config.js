/* eslint-disable no-useless-catch */
import { Client, ID, Query, Databases, Storage } from "appwrite";

import conf from "../conf/conf";
export class Services {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //create post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite :: CreatePost ::service ::  error", error);
    }
  }

  //delete post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite :: Delete post ::  service ::  error", error);
      return false;
    }
  }

  //update post
  async updatePost({ title, slug, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, slug, content, featuredImage, status }
      );
    } catch (error) {
      console.log("Appwrite :: UpdatePost ::service ::  error", error);
    }
  }

  // get All posts
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite :: GetPosts ::service ::  error", error);
      return false;
    }
  }

  //get post
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite :: GetPost ::service ::  error", error);
      return false;
    }
  }

  //Todo: Separate this storage service

  //create file upload storage
  async uploadFile(file) {
    try {
      await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
      return true;
    } catch (error) {
      console.log("Appwrite :: uploadFile ::service ::  error", error);
      return false;
    }
  }

  //delete file upload
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite :: deleteFile ::service ::  error", error);
      return false;
    }
  }

  //get file preview
  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite :: getFilePreview ::service ::  error", error);
    }
  }
}

const services = new Services();

export default services;
