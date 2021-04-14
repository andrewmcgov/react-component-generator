export function exportLineTemplate(
  componentName: string,
  componentsFolderIndex?: boolean
) {
  return componentsFolderIndex
    ? `export {${componentName}} from './${componentName}';\n`
    : `export * from './${componentName}';\n`;
}
