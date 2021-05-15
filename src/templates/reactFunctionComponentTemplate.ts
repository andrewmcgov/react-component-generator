import { StyleLanguage } from '../types';

export function reactFunctionComponentTemplate(
  componentName: string,
  stylesLanguage: StyleLanguage = StyleLanguage.scss
) {
  return `
import React from 'react';

import styles from './${componentName}.${stylesLanguage}';

export interface ${componentName}Props {
  prop?: string;
}

export function ${componentName}({prop = 'default value'}: ${componentName}Props) {
  return <div className={styles.${componentName}}>${componentName} {prop}</div>;
}
`.trimLeft();
}
