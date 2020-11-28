export function exportLine(componentName: string) {
  return `export {${componentName}} from './${componentName}';\n`;
}
