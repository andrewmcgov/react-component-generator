export function reactFunctionComponentTemplate(componentName: string) {
  return `
import React from 'react';

import styles from './${componentName}.scss';

export interface ${componentName}Props {
  prop?: string;
}

export function ${componentName}({prop = 'default value'}: ${componentName}Props) {
  return <div className={styles.${componentName}}>${componentName} {prop}</div>;
}
`.trimLeft();
}
