import { Stage } from "@pixi/react";

// https://blog.codedash.in/building-a-next-js-editor-with-pixijs-and-react-pixi-4a6ebf6df76a
// https://github.com/pixijs/open-games
// Pixi seems like a bad idea. I will just follow these instructions and use HTML5 canvas directly: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
const PixiStage = () => {
  return (
    <Stage width={400} height={900} options={{ backgroundColor: 0x000 }}>
      {/* Pixi components will go here */}
    </Stage>
  );
};

export default PixiStage;
