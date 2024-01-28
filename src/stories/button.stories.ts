import {
  componentWrapperDecorator,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import { ButtonComponent } from './button.component';
import { style } from '@angular/animations';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ButtonComponent> = {
  title: 'Example/Button',
  component: ButtonComponent,
  decorators: [
    componentWrapperDecorator(
      (story) => `<div style="margin-left: 100px">${story}</div>`
    ),
  ],
  tags: ['autodocs'],
  render: (args: ButtonComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};
Primary.storyName = 'Primary button';

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};
