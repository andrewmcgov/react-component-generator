export function reactFunctionComponentTemplate(componentName: string) {
  return `
import React from 'react';

import styles from './${componentName}.scss';

export function ${componentName}() {
  return <div className={styles.${componentName}}>${componentName}</div>;
}
`.trimLeft();
}
