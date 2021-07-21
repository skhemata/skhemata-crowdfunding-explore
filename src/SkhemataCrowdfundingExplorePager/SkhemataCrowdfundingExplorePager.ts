/**
 *
 * Lit Skhemata Crowd Funding Campaign Sort Element
 *
 */

// Import litelement base class, html helper function & typescript decorators
import { LitElement, html, property } from 'lit-element';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';

// Import custom style elements
import { Bulma } from 'skhemata-css';
import { SkhemataCrowdfundingExplorePagerStyles } from './SkhemataCrowdfundingExplorePagerStyles';

// Import element dependencies
export class SkhemataCrowdfundingExplorePager extends ScopedElementsMixin(
  LitElement
) {
  // Property decorator (requires TypeScript or Babel)
  // Attributes that can be passed into different elements
  @property({ type: String, attribute: 'campaign-api-host' })
  campaignApiHost = '';

  @property({ type: String, attribute: 'campaign-page-path' })
  campaignPagePath = '';

  @property({ type: String })
  apiPath = '/service/restv1/campaign';

  @property({ type: Number, attribute: 'total-pages' })
  totalPages = 0;

  static get styles() {
    return [Bulma, SkhemataCrowdfundingExplorePagerStyles];
  }

  /**
   * Implement firstUpdated to perform one-time work after
   * the element’s template has been created.
   */
  firstUpdated() {}

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    if (name === 'total-pages') {
      this.totalPages = newValue;
      this.listPage();
    }
  }

  listPage() {
    let pageArray: any = [
      html`
        <li>
          <button
            class="button pagination-link is-current"
            aria-label="Page 1"
            aria-current="page"
          >
            1
          </button>
        </li>
      `,
    ];

    if (this.totalPages) {
      pageArray = [];
      for (let i = 1; i <= this.totalPages; i += 1) {
        pageArray.push(i);
      }

      pageArray = pageArray.map(
        (page: any, i: any) => html`
          <li>
            <button
              class="button pagination-link is-current"
              aria-label="Page ${i + 1}"
              aria-current="page"
              @click=${this.handleClick}
              @keydown=${(e: any) => {
                if (e.keyCode === '13') this.handleClick(e);
              }}
            >
              ${i + 1}
            </button>
          </li>
        `
      );
    }

    return pageArray;
  }

  handleClick = (event: any) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', event.target.innerText);
    window.history.pushState(
      {},
      '',
      decodeURIComponent(`${window.location.pathname}?${params}`)
    );
    window.dispatchEvent(new Event('popstate'));
  };

  /**
   * Implement `render` to define a template for your element.
   * Use JS template literals
   */
  protected render() {
    // const params = new URLSearchParams(window.location.search);
    // const currentPage = params.get('page');

    return html`
      <nav
        class="pagination is-centered is-small"
        role="navigation"
        aria-label="pagination"
      >
        <ul class="pagination-list">
          ${this.listPage()}
        </ul>
      </nav>
    `;
  }
}
