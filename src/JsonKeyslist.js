import { html, css, LitElement } from 'lit';

export class JsonKeyslist extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--json-keyslist-text-color, #000);
        background-color: var(--json-keyslist-background-color, #fff);
      }
      ul {
        width: var(--json-keyslist-width, 100%);
      }
      li {
        list-style: none;
        margin: var(--json-keyslist-link-margin, 0.5rem);
        border-bottom: var(--json-keyslist-link-border-bottom, 1px solid #000);
      }
      a {
        color: var(--json-keyslist-link-color, #000);
        text-decoration: none;
        font-size: var(--json-keyslist-link-font-size, 16px);
        font-weight: var(--json-keyslist-link-font-weight, normal);
        font-family: var(--json-keyslist-link-font-family, verdana);
      }
      .selected {
        color: var(--json-keyslist-selected-link-color, #333);
        font-weight: var(--json-keyslist-selected-link-font-weight, bold);
        background-color: var(--json-keyslist-selected-link-background-color, #a0a0a0);
      }

    `;
  }

  static get properties() {
    return {
      id: { type: String },
      mainKey: { type: String },
      jsonData: { type: Object },
      jsonDataKeys: { type: Array },
    };
  }

  constructor() {
    super();
    this.id = `json-keyslist${Math.floor(Math.random() * 1000000)}`;
    this.mainKey = '';
    this.jsonData = {};
    this.jsonDataKeys = [];
    document.addEventListener('json-keyslist-data-changed', this._dataReceived.bind(this));
  }

  firstUpdated() {
    const componentCreatedEvent = new CustomEvent('wc-ready', {
      detail: {
        id: this.id,
        componentName: this.tagName,
        component: this,
      },
    });
    document.dispatchEvent(componentCreatedEvent);
  }

  async _dataReceived(e) {
    this.mainKey = e.detail.mainKey || '';
    this._processJsonData(e.detail.data);
    await this.updateComplete;
    this._addLinkEvents();
  }

  _addLinkEvents() {
    const links = [...this.shadowRoot.querySelectorAll('a')];
    links.forEach((link) => {
      link.removeEventListener('click', this._handleClickElement.bind(this));
      link.addEventListener('click', this._handleClickElement.bind(this));
    });
  }

  _handleClickElement(e) {
    e.preventDefault();
    const {value} = e.target.dataset;
    const event = new CustomEvent('json-keyslist-selected-item', {
      detail: {
        mainKey: this.mainKey,
        selectedItem: value,
      },
    });
    document.dispatchEvent(event);
    [...this.shadowRoot.querySelectorAll('a')].forEach((link) => {
      link.classList.remove('selected');
    });
    e.target.classList.add('selected');    
  }

  _processJsonData(jsonData) {
    if (Array.isArray(jsonData)) {
      this.jsonDataKeys = jsonData.map((item) => {
        if (typeof item === 'object') {
          return html`<a href="#${item[this.mainKey]}" data-value='${item[this.mainKey]}'>${item[this.mainKey]}</a>`;
        }
        return item;
      });
    } else {
      this.jsonDataKeys = Object.keys(jsonData);
    }
    this.requestUpdate();
  }

  render() {
    return html`
      <ul>
        ${this.jsonDataKeys.map((key) => html`
          <li>${key}</li>
        `)}
      </ul>
    `;
  }
}
