import {makeAutoObservable} from "mobx"
import {fetchComponents, fetchConfigurationComponents, fetchFilterComponents} from "../api/components-api";
import {fromPromise} from "mobx-utils"
import {qsString} from "../Global";
import configuratorStore from "./configurator-store";

class ComponentStore {
  components = null;
  filterComponents = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchComponentsAction(componentType, filter) {
    console.log("fetchComponentsAction called");

    filter = typeof filter === "object" 
        ? "?" + qsString(filter) 
        : filter; 
    this.components = fromPromise(fetchComponents(componentType, filter ? filter : ""));
  }

  fetchFilterComponentAction(componentType) {
    console.log("fetchFilterComponentsAction called");

    this.filterComponents = fromPromise(fetchFilterComponents(componentType));
  }

  fetchConfigurationComponentsAction(componentType) {
    console.log("fetchConfigurationComponentsAction called");

    if (!Object.keys(configuratorStore.configurations).length) {
      this.fetchComponentsAction(componentType)
    } else {
      const filter = "?" + qsString(configuratorStore.configurations);
      this.components = fromPromise(fetchConfigurationComponents(componentType, filter));
    }
  }
}

export default new ComponentStore()