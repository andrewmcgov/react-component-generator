export function exportLineTemplate(componentName: string) {
  return `export {${componentName}} from './${componentName}';\n`;
}
