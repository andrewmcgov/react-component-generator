export function reactFunctionComponentTemplate(
  componentName: string,
  useDefaultExport: boolean
) {
  return `
import React from 'react';

export ${useDefaultExport ? 'default ' : ''}function ${componentName}() {
  return <div>${componentName}</div>;
}
`.trimLeft();
}
