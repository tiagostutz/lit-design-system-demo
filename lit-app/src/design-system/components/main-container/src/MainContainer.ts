import { LitElement, css, html, customElement, property } from 'lit-element';
import { Position } from '../../common-types/positioning';
import { Breakpoints } from '../../common-types/sizes';

/**
 * @slot content of the title
 */
@customElement('main-container')
export class MainContainer extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      .max-width-none {
        max-width: 100%;
      }
      .max-width-2xl {
        max-width: 1536px;
      }
      .max-width-xl {
        max-width: 1280px;
      }
      .max-width-lg {
        max-width: 1024px;
      }
      .max-width-md {
        max-width: 768px;
      }
      .max-width-sm {
        max-width: 640px;
      }

      .mx-auto {
        margin-left: auto;
        margin-right: auto;
      }
    `;
  }

  @property({ attribute: 'max-width' })
  maxWidth: Breakpoints = 'none';

  @property({ attribute: 'position' })
  position: Position = 'center';

  render() {
    const maxWidthClass = this.maxWidth ? `max-width-${this.maxWidth}` : '';
    const positionClass = this.position === 'center' ? `mx-auto` : 'none';

    return html`<div class="${maxWidthClass} ${positionClass}">
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'main-container': MainContainer;
  }
}
