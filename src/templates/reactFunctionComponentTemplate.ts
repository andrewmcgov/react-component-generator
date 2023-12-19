import {Language, StyleLanguage} from '../types';
import {toKebabCase} from '../utilities';

export function reactFunctionComponentTemplate(
  componentName: string,
  stylesLanguage: StyleLanguage = StyleLanguage.scss,
  importReact: boolean,
  useCssModules: boolean,
  language: Language,
  usePropTypes: boolean
) {
  return `
${importReact ? `import React from 'react';` : ''}
${language === Language.javaScript && usePropTypes ? `import PropTypes from 'prop-types';` : ''}
${useCssModules ? `import styles from './${componentName}.${stylesLanguage}';` : `import './${componentName}.${stylesLanguage}';`}
${language === Language.typeScript ? `
export interface ${componentName}Props {
  customProp?: string;
}
`: '' }
const ${componentName} = ({ customProp = 'default value' }${language === Language.typeScript ? `: ${componentName}Props` : ''}) => {
  return <div className=${useCssModules ? `{styles.${componentName}}` : `'${toKebabCase(componentName)}'`}>${componentName} {customProp}</div>;
}

${language === Language.javaScript && usePropTypes ? `${componentName}.propTypes = {
  customProp: PropTypes.string,
};
` : ''}
export default ${componentName};
`.trimLeft();
}
