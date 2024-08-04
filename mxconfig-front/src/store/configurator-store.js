import {makeAutoObservable} from "mobx"
import {qsString} from "../Global";
import { addToConfiguration, removeFromConfiguration, fetchUserConfiguration } from "../api/configurator-api";

class ConfiguratorStore {
  userConfigurations = {};


  constructor() {
    makeAutoObservable(this);
  }

  async addToConfiguration(componentType, id) {
    console.log(componentType, id);
    
    const response = await addToConfiguration({componentType, id});
    return response.data;
  }

  async removeFromConfiguration(componentType, id) {
    console.log(componentType, id);
    
    const response = await removeFromConfiguration({componentType, id});
    return response.data;
  }

  async fetchUserConfigurationAction() {
    console.log("fetchUserConfigurationAction called");
    const response = await fetchUserConfiguration();
    
    if (response.status === "error") {
      throw new Error(response.message);
    }

    this.userConfigurations = response.data;    
    return response;
  }

  // fetchuserConfigurationsAction(componentType, filter) {
  //   console.log("fetchuserConfigurationsAction called");
  //   filter = typeof filter === "object" 
  //       ? "?" + qsString(filter) 
  //       : filter; 
  // }
}

export default new ConfiguratorStore()