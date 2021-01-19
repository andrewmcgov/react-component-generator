export function testFileTemplate(
  componentName: string,
  importAsDefault: boolean
) {
  return `
import React from 'react';

${
  importAsDefault
    ? `import ${componentName} from '../${componentName}'`
    : `import {${componentName}} from '../${componentName}'`
};

describe('<${componentName} />', () => {});
`.trimLeft();
}
