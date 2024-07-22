import { Renderer } from "./logic/renderer";

const createGraphicsSingleton = () => {
  return new Renderer();
};

declare global {
  var graphics: Renderer | undefined;
}

const graphics = global.graphics ?? createGraphicsSingleton();

if (process.env.NODE_ENV !== "production") global.graphics = graphics;

export { graphics };
