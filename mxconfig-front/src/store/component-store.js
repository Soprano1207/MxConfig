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

    if (!Object.keys(configuratorStore.userConfigurations).length) {
      this.fetchComponentsAction(componentType)
    } else {
      const components = configuratorStore.userConfigurations;
      const filterData = {};
      for (const key in components) {
        if (Object.hasOwnProperty.call(components, key)) {
          filterData[key] = components[key]._id;
        }
      }

      const filter = "?" + qsString(filterData);
      this.components = fromPromise(fetchConfigurationComponents(componentType, filter));
    }
  }
}

export default new ComponentStore()