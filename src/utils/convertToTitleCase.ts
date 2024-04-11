// convert snake case or camel case to title case
export const convertToTitleCase = (str: string) => {
  return str
    .split(/(?=[A-Z])|_/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
