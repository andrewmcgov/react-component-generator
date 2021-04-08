export function reactFunctionComponentTemplate(componentName: string) {
  return `
import React from 'react';

export function ${componentName}() {
  return <div>${componentName}</div>;
}
`.trimLeft();
}
