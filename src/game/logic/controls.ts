export const handleKey = (type: "down" | "up") => (event: KeyboardEvent) => {
  console.log("keypress event:", type, event.key);
};
