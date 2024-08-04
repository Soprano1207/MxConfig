import {makeAutoObservable} from "mobx"
import {qsString} from "../Global";
import {signIn, signUp, authorization} from "../api/user-api";
import axios from "axios";

class UserStore {
  user = {
    login: "",
    email: "",
    firstName: "",
    lastName: "",
    officepost: "",
    img: "",
    token: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  async authorization() {
    const response = await authorization();
    if (response.status === "error") {
      throw new Error(response.message);
    }

    this.user = {...this.user, ...response.data}
  }

  async signIn(data) {
    const response = await signIn(data)
    if (response.status === "error") {
      throw new Error(response.message);
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    setLocalStorageToken(response.data.token);

    this.user = {...this.user, ...response.data}
  }

  async signUp(data) {
    const response = await signUp(data);

    if (response.status === "error") {
      throw new Error(response.message);
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
    setLocalStorageToken(response.data);
    
    const userDataObj = {};
    Object.keys(this.user).forEach((key) => {
      userDataObj[key] = data[key] || this.user[key];
    })

    this.user = {...this.user, ...userDataObj, token: response.data}
  }

  signOut() {
    const userDataObj = {};
    Object.keys(this.user).forEach((key) => {
      userDataObj[key] = "";
    })

    delete axios.defaults.headers.common['Authorization'];
    clearLocalStorageToken();
    this.user = userDataObj;
  }

  async changeUserInfo() {

  }
}

function setLocalStorageToken(token) {
  localStorage.setItem("token", token);
}
function clearLocalStorageToken() {
  localStorage.removeItem("token");
}

export default new UserStore()