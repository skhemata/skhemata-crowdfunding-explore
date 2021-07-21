/**
 *
 * Lit Campaign List Element
 *
 */

// Import litelement base class, html helper function & typescript decorators
import { LitElement, html, property } from 'lit-element';

// Import lit-html, directives & etc
import { repeat } from 'lit-html/directives/repeat';

// Import glboal style elements
import { Bulma } from 'skhemata-css';

// Import Icon
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

// local styles
import { SkhemataCrowdfundingExploreGridStyles } from './SkhemataCrowdFundingExploreGridStyles';
import { CampaignSharedStyles } from '../styles/CampaignSharedStyles';

// Import custom functions from directives
import { GetCampaignThumbnail } from '../directives/GetCampaignThumbnail';

export class SkhemataCrowdfundingExploreGrid extends LitElement {
  // Property decorator (requires TypeScript or Babel)
  // Attributes that can be passed into different elements
  @property({ type: String, attribute: 'campaign-api-host' })
  campaignApiHost = '';

  @property({ type: String, attribute: 'campaign-page-path' })
  campaignPagePath = '';

  // Component specific properties
  @property({ type: String })
  apiPath = '/service/restv1/campaign/';

  @property({ type: String })
  imgPath = '/image/campaign_thumbnail_xl/';

  @property({ type: Array })
  private campaignPosts = [];

  @property({ type: Number })
  pageEntries = 9;

  @property({ type: Number })
  pageNumber = 1;

  @property({ type: Number })
  totalPages = 0;

  @property({ type: Number })
  totalPageCounts = 0;

  @property({ type: Number })
  totalCount = 0;

  //  __increment() {
  //   this.counter += 1;
  // }

  static get styles() {
    return [Bulma, SkhemataCrowdfundingExploreGridStyles, CampaignSharedStyles];
  }

  static get properties() {
    return {
      totalPageCounts: { type: Number, readOnly: true },
    };
  }

  constructor() {
    // Always call super() first
    super();
    this.totalPageCounts = this.totalPages;
    window.addEventListener(
      'popstate',
      () => {
        this.getPosts();
      },
      false
    );
  }

  /**
   * Implement `render` to define a template for your element.
   * Use JS template literals
   */
  protected render() {
    return html`
      <div id="campaignList" class="campaign-list" .value="${this.totalPages}">
        ${repeat(
          this.campaignPosts,
          (post: any) => post.id,
          post =>
            html`
              <div class="campaign-item card">
                <div
                  class="arrow-right 
                ${post.featured ? 'second' : ''}
                ${post.ends ? 'first' : ''}
              "
                >
                  <span>
                    ${post.featured
                      ? unsafeHTML(
                          icon(faStar, { transform: { size: 3 } }).html[0]
                        )
                      : ''}
                  </span>
                  <span class="campaign-ended">
                    ${post.ends && !post.featured ? 'Ended' : ''}
                  </span>
                </div>
                <div class="card-image">
                  <figure class="image is-4by3">
                    ${GetCampaignThumbnail(post.files)
                      ? html`<img
                          id="campaign-featured-img"
                          src="${this.campaignApiHost}${this
                            .imgPath}${GetCampaignThumbnail(post.files)}"
                          alt="Featured"
                        />`
                      : html`
                          <img
                            id="campaign-featured-img"
                            src="https://cdn5.thrinacia.com/${this.campaignApiHost
                              .replace('https://', '')
                              .replace(
                                '.thrinacia.com/api',
                                ''
                              )}/images/placeholder-images/placeholder_campaign.png"
                            alt="Featured"
                          />
                        `}
                  </figure>
                </div>
                <div class="card-content">
                  <p class="card-header-title">${post.name}</p>
                  <h5 class="campaign-author-name">
                    By ${post.managers[0].first_name}
                    ${post.managers[0].last_name}
                  </h5>
                  <div class="campaign-excerpt">${post.days_elapsed} Days</div>
                  <div class="campaign-excerpt">${post.blurb}</div>
                  <progress
                    class="progress is-primary"
                    value="${post.funded_percentage}"
                    max="100"
                  >
                    ${post.funded_percentage}
                  </progress>
                  <div class="campaign-excerpt">$${post.funded_amount}</div>
                  <div class="campaign-excerpt">
                    $${Math.round(post.funded_percentage)}%
                  </div>
                </div>
              </div>
            `
        )}
      </div>
    `;
  }

  /**
   * Implement firstUpdated to perform one-time work after
   * the element’s template has been created.
   */
  firstUpdated() {
    this.getPosts();
    if (this.campaignPagePath) {
      this.campaignPagePath = `/${this.campaignPagePath}`;
    }
  }

  // getPages(event:any){
  //   // const params = new URLSearchParams(window.location.search);
  //   // params.set('total', event.target.getAttribute('value'));
  //   // window.location.href= `${this.campaignPagePath}?${params.toString()}`;

  //   this.updateTotalPages();
  // }

  private getPosts() {
    // Use fetch method to make a request
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

    const params = new URLSearchParams(window.location.search);
    const category = params.getAll('c');
    const search = params.get('s');
    const city = params.get('city');
    const sort = params.get('sort');
    const page = params.get('page');

    let categoryParams = '';
    let searchParams = '';
    let cityParams = '';
    let queryParams = '';
    let sortParams = '';

    if (category && !search && !city) {
      categoryParams = `&filters={"category":[${category}]}`;
    } else {
      categoryParams = '';
    }

    if (search && !category && !city) {
      searchParams = `&filters={"name":"${search}"}`;
    } else {
      searchParams = '';
    }

    if (city) {
      cityParams = `&filters={"location":"${city}"}`;
    } else {
      cityParams = '';
    }

    if (category && search) {
      queryParams = `&filters={"category":[${category}], "name": "${search}"}`;
    } else {
      queryParams = '';
    }

    if (sort) {
      sortParams = `&sort=${sort}`;
    } else {
      sortParams = '';
    }

    // console.log(`${this.campaignApiHost}${this.apiPath}?page=${this.pageNumber}&page_entries=${this.pageEntries}${categoryParams}${searchParams}${queryParams}${cityParams}${sortParams}`)
    fetch(
      `${this.campaignApiHost}${this.apiPath}?page=${page}&page_entries=${this.pageEntries}${categoryParams}${searchParams}${queryParams}${cityParams}${sortParams}`
    )
      .then(response => {
        this.totalCount = Number(response.headers.get('X-Pager-Total-Entries'));
        this.totalPages = Number(response.headers.get('X-Pager-Last-Page'));
        this.dispatchEvent(
          new CustomEvent('campaignload', {
            detail: {
              totalPages: this.totalPages,
            },
          })
        );

        const contentType = response.headers.get('Content-Type');

        // Check if response header content type is json
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        }
        // Throw error if above condition isn't met
        throw new TypeError('The format is not JSON.');
      })
      .then(data => {
        if (typeof data !== 'undefined') {
          this.campaignPosts = data;
        }
      });
  }
}
