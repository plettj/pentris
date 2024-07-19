export const handleKey = (type: "down" | "up") => (event: KeyboardEvent) => {
  console.log(type, event.key);
};
