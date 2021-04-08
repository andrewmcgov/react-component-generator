export function exportLineTemplate(
  componentName: string,
  componentsFolderIndex?: boolean
) {
  // These return the same thing right now, leaving them in because we will soon switch this the second one to export * form './ComponentName'
  return componentsFolderIndex
    ? `export {${componentName}} from './${componentName}';\n`
    : `export {${componentName}} from './${componentName}';\n`;
}
