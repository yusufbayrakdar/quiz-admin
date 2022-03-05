const ENVIRONMENT = {
  DEVELOPMENT: "development",
  STAGING: "staging",
  PRODUCTION: "production",
};
const APP: { [key: string]: string } = {
  development: `http://localhost:5000`,
  staging: `https://bilsemiq-api.herokuapp.com`,
  production: `https://bilsemai.herokuapp.com`,
};
export const activeEnvironment =
  process.env.NODE_ENV === "production"
    ? ENVIRONMENT.PRODUCTION
    : ENVIRONMENT.DEVELOPMENT;

const API_PATH = APP[activeEnvironment];

export default API_PATH;
