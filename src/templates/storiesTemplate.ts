export function storiesTemplate(componentName: string, importReact: boolean) {
  return `
${importReact ? "import React from 'react';" : ''}
import type {Meta, StoryObj} from '@storybook/react';

import {${componentName}} from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  component: ${componentName},
};

export default meta;

type Story = StoryObj<typeof ${componentName}>;

export const Basic: Story = {args: {}};
`.trimStart();
}
