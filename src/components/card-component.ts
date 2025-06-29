import {globalStyleSheet} from '../styles/globalStyleSheets.ts';

class CardComponent extends HTMLElement {
  static get observedAttributes() {
    return ['header', 'text'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }


  connectedCallback() {
    (this.shadowRoot as ShadowRoot).adoptedStyleSheets = [globalStyleSheet];
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const header = this.getAttribute('header') || '';
    const text = this.getAttribute('text') || '';
    this.shadowRoot!.innerHTML = ` 
      <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6">
        <div class="font-bold text-xl mb-2">${header}</div>
        <p class="text-gray-700 text-base">${text}</p>
      </div>
    `;
  }
}

customElements.define('card-component', CardComponent);

