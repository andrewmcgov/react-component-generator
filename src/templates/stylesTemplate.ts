import { toKebabCase } from "../utilities";

export function stylesTemplate(componentName: string, useCssModules:boolean) {
  return `
.${useCssModules ? componentName : toKebabCase(componentName)} {
  
}
`.trimLeft();
}
