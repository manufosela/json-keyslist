import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../json-keyslist.js';

describe('JsonKeyslist', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture(html`<json-keyslist></json-keyslist>`);

    expect(el.title).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture(html`<json-keyslist></json-keyslist>`);
    el.shadowRoot.querySelector('button').click();

    expect(el.counter).to.equal(6);
  });

  it('can override the title via attribute', async () => {
    const el = await fixture(html`<json-keyslist title="attribute title"></json-keyslist>`);

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`<json-keyslist></json-keyslist>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
