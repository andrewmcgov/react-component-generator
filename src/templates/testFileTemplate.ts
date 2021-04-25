export function testFileTemplate(componentName: string, singleQoute: boolean = true) {
  let text = `
import React from 'react';

import {${componentName}} from '../${componentName}';

describe('<${componentName} />', () => {});
`;
  return (singleQoute ? text : text.split(`'`).join(`"`)).trimLeft();
}
