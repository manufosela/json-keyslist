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
        margin:0;
        padding:0;
      }
      li {
        list-style: none;
        margin: var(--json-keyslist-link-margin, 0.5rem);
        border-bottom: var(--json-keyslist-link-border-bottom, 1px solid #000);
      }
      li.title {
        font-size: var(--json-keyslist-title-font-size, 1.5rem);
        background-color: var(--json-keyslist-title-background-color, #000);
        color: var(--json-keyslist-title-color, #fff);
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
      title: { type: String },
      mainKey: { type: String },
      jsonData: { type: Object },
      jsonDataKeys: { type: Array },
      selectedItem: { type: String },
    };
  }

  constructor() {
    super();
    this.id = `json-keyslist${Math.floor(Math.random() * 1000000)}`;
    this.title = null;
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

  setSelectedItem(value) {
    this.selectedItem = value;
    this.__markSelecteditem();
    this.shadowRoot.querySelector(`a[data-value='${this.selectedItem}']`).dispatchEvent(new Event('click'));
  }

  async _dataReceived(e) {
    let jsonData;
    this.mainKey = e.detail.mainKey || '';
    if (e.detail.jsonData) {
      if (Array.isArray(e.detail.jsonData)) {
        jsonData = e.detail.jsonData;
      } else {
        jsonData = (this.mainKey) ? e.detail.jsonData[this.mainKey] : e.detail.jsonData;
      }
      this._processJsonData(jsonData);
      await this.updateComplete;
      this._addLinkEvents();
    } else {
      console.warn('No data received');
    }
  }

  _addLinkEvents() {
    const links = [...this.shadowRoot.querySelectorAll('a')];
    links.forEach((link) => {
      link.removeEventListener('click', this._handleClickElement.bind(this));
      link.addEventListener('click', this._handleClickElement.bind(this));
    });
  }

  __markSelecteditem() {
    [...this.shadowRoot.querySelectorAll('a')].forEach((link) => {
      link.classList.remove('selected');
    });
    const item = this.shadowRoot.querySelector(`a[data-value='${this.selectedItem}']`);
    item.classList.add('selected');
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
    this.selectedItem = value;
    this.__markSelecteditem();
  }

  _getTitle() {
    const title = (this.title) ? html`
    <ul>
      <li class="title"><strong>${this.title}</strong></li>
    </ul>
    `: '';
    return title;
  }


  _processJsonData(jsonData) {
    if (jsonData) {
      if (Array.isArray(jsonData)) {
        this.jsonDataKeys = jsonData.map((item) => {
          if (typeof item === 'object') {
            return html`<a href="#${item[this.mainKey]}" data-value='${item[this.mainKey]}'>${item[this.mainKey]}</a>`;
          }
          return item;
        });
      } else {
        const keys = Object.keys(jsonData);
        this.jsonDataKeys = keys.map((key) => {
          if (typeof jsonData[key] === 'object') {
            return html`<a href="#${key}" data-value='${key}'>${key}</a>`;
          }
          return jsonData[key];
        });
      }
      this.requestUpdate();
    } else {
      this.jsonDataKeys = [];
      console.warn('No data received');
    }
  }

  render() {
    return html`
    <nav>
      ${this._getTitle()}
      <ul>
        ${this.jsonDataKeys.map((key) => html`
          <li>${key}</li>
        `)}
      </ul>
    </nav>
    `;
  }
}
