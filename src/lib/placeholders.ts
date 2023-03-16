export const PLACEHOLDER_COMPONENT = `
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  shadow: true,
})
export class MyComponent {
  @Prop() first: string;
  @Prop() middle: string;
  @Prop() last: string;

  private getText(): string {
    return \`\${this.first} \${this.middle} \${this.last}\`;
  }

  render() {
    return <div>Hello, World! I'm {this.getText()}</div>;
  }
}`.trim();
