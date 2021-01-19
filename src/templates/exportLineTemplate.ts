export function exportLineTemplate(
  componentName: string,
  defaultExport: boolean,
  componentsFolderIndex?: boolean
) {
  if (componentsFolderIndex) {
    return defaultExport
      ? `export {default as ${componentName}} from './${componentName}';\n`
      : `export {${componentName}} from './${componentName}';\n`;
  }

  return defaultExport
    ? `export {default} from './${componentName}';\n`
    : `export {${componentName}} from './${componentName}';\n`;
}
