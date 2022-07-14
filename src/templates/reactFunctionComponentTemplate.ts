import { StyleLanguage } from '../types';

export function reactFunctionComponentTemplate(
  componentName: string,
  stylesLanguage: StyleLanguage = StyleLanguage.scss
) {
  return `
export interface Props {
}

export function ${componentName}({}: Props) {
  return <div>Hello world</div>;
}
`.trimLeft();
}
