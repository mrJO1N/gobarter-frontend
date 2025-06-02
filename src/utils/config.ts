import * as envFile from "../../env.json";

export const config = {
  get(key: keyof typeof envFile) {
    const val = envFile[key];

    if (!val) throw `no ${key} in 'env.json'`;
    return val;
  },
};
