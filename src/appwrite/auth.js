/* eslint-disable no-useless-catch */
import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        //login newly created user
        this.loginUser({ email, password });
      }
      return userAccount;
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Appwrite :: Login service ::  error", error);
    }
  }

  async logout() {
    try {
      return this.account.deleteSessions("current");
    } catch (error) {
      console.log("Appwrite :: Logout service ::  error", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite :: Get Current User service ::  error", error);
    }
  }
}

const authService = new AuthService();
export default authService;
