import {makeAutoObservable} from "mobx"
import {qsString} from "../Global";
import { addToConfiguration } from "../api/configurator-api";

class ConfiguratorStore {
  configurations = {motherboard: "669655fb1dbe3921b7c76a01"};

  constructor() {
    makeAutoObservable(this);
  }

  async addToConfiguration(componentType, id) {
    console.log(componentType, id);
    const currentConfiguration = this.configurations;
    currentConfiguration[componentType] = id;
    
    const response = await addToConfiguration(currentConfiguration);

    console.log(response);
  }

  fetchUserConfigurationsAction() { //штука сейчас может получить конфигурации любого пользователя (опасно)
    console.log("fetchUserConfigurationsAction called");
  }

  fetchConfigurationsAction(componentType, filter) {
    console.log("fetchConfigurationsAction called");
    filter = typeof filter === "object" 
        ? "?" + qsString(filter) 
        : filter; 
  }
}

export default new ConfiguratorStore()