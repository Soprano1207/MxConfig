import {makeAutoObservable} from "mobx"
import {qsString} from "../Global";
import {signIn, signUp} from "../api/user-api";
import axios from "axios";

class UserStore {
  user = {
    login: "",
    email: "",
    firstName: "",
    lastName: "",
    officepost: "",
    img: "https://docs.material-tailwind.com/img/team-3.jpg",
    token: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  async signIn(data) {
    const response = await signIn(data)

    if (response.status === "error") {
      throw new Error(response.message);
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

    this.user = {...this.user, ...response.data}
  }

  async signUp(data) {
    const response = await signUp(data);

    if (response.status === "error") {
      throw new Error(response.message);
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
    
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
    this.user = userDataObj;
  }

  fetchConfigurationsAction(componentType, filter) {
    console.log("fetchConfigurationsAction called");
    filter = typeof filter === "object" 
        ? "?" + qsString(filter) 
        : filter; 
  }
}

export default new UserStore()