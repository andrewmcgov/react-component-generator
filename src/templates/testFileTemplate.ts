export function testFileTemplate(componentName: string) {
  return `
import React from 'react';

import {${componentName}} from '../${componentName}';

describe('<${componentName} />', () => {});
`.trimLeft();
}
