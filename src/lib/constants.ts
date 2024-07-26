export const PROD_URL = "https://plett.fun";
export const DEV_URL = "http://localhost:3000";
export const BASE_URL =
  process.env.NODE_ENV === "production" ? PROD_URL : DEV_URL;

export const HOME_HREF = "/";
export const PENTRIS_HREF = "/pentris";
export const SPLIT_SECOND_HREF = "/split-second";

export const PENTRIS_IMAGES_HREF = "/static/pentris";
export const SPLIT_SECOND_IMAGES_HREF = "/static/split-second";
