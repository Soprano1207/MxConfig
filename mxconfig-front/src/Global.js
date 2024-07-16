import {tt} from "./data/translate"
import qs from "qs"

const dataErrors = {
  minLength: "Недостаточно символов",
  maxLength: "Переизбыток символов",
  required: "Обязательно для заполнения",
}

const t = (page, key) => {
 return tt[page][key] ?? "";
}

const qsString = (obj) => {
  return qs.stringify(obj, {
    skipNulls: true,
    filter: (prefix, value) => {
      return value === "" || (Array.isArray(value) && value.length === 0)
        ? undefined
        : value;
    },
  });
}

export {dataErrors, t, qsString}