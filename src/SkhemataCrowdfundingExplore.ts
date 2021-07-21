/**
 *
 * Lit Blog parent component to handle routing
 *
 */
import { html, css, LitElement, property } from 'lit-element';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';

// Import custom style elements
import { Bulma } from 'skhemata-css';

// Import element dependencies
import { SkhemataCrowdfundingExploreCategory } from './SkhemataCrowdfundingExploreCategory/SkhemataCrowdFundingExploreCategory';
import { SkhemataCrowdfundingExploreSearch } from './SkhemataCrowdfundingExploreSearch/SkhemataCrowdFundingExploreSearch';
import { SkhemataCrowdfundingExploreLocation } from './SkhemataCrowdfundingExploreLocation/SkhemataCrowdfundingExploreLocation';
import { SkhemataCrowdfundingExploreSort } from './SkhemataCrowdfundingExploreSort/SkhemataCrowdFundingExploreSort';
import { SkhemataCrowdfundingExploreGrid } from './SkhemataCrowdfundingExploreGrid/SkhemataCrowdfundingExploreGrid';
import { SkhemataCrowdfundingExplorePager } from './SkhemataCrowdfundingExplorePager/SkhemataCrowdfundingExplorePager';

export class SkhemataCrowdfundingExplore extends ScopedElementsMixin(
  LitElement
) {
  @property({ type: String, attribute: 'campaign-api-host' })
  campaignApiHost = '';

  @property({ type: String, attribute: 'campaign-page-path' })
  campaignPagePath = '';

  @property({ type: Number, attribute: 'total' })
  totalPages = 0;

  static get styles() {
    return [
      Bulma,
      css`
        :host {
          display: block;
          padding: 25px;
          color: var(--skhemata-crowdfunding-explore-text-color, #000);
        }
      `,
    ];
  }

  static get scopedElements() {
    return {
      'skhemata-crowdfunding-explore-category': SkhemataCrowdfundingExploreCategory,
      'skhemata-crowdfunding-explore-search': SkhemataCrowdfundingExploreSearch,
      'skhemata-crowdfunding-explore-sort': SkhemataCrowdfundingExploreSort,
      'skhemata-crowdfunding-explore-location': SkhemataCrowdfundingExploreLocation,
      'skhemata-crowdfunding-explore-grid': SkhemataCrowdfundingExploreGrid,
      'skhemata-crowdfunding-explore-pager': SkhemataCrowdfundingExplorePager,
    };
  }

  static get properties() {
    return {
      total: { type: String },
    };
  }

  handleCampaignLoad = (e: any) => {
    this.totalPages = e.detail.totalPages;
  };

  render() {
    // const currentPath = window.location.pathname.split('/');
    // if(currentPath.length > 1 && currentPath[1] == this.campaignApiHost)
    return html`
      <div class="columns">
        <div class="column is-one-quarter" id="explore-container">
          <skhemata-crowdfunding-explore-search
            campaign-api-host="${this.campaignApiHost}"
            campaign-page-path="${this.campaignPagePath}"
          ></skhemata-crowdfunding-explore-search>
          <skhemata-crowdfunding-explore-category
            campaign-api-host="${this.campaignApiHost}"
            campaign-page-path="${this.campaignPagePath}"
          ></skhemata-crowdfunding-explore-category>
          <skhemata-crowdfunding-explore-location
            campaign-api-host="${this.campaignApiHost}"
            campaign-page-path="${this.campaignPagePath}"
          ></skhemata-crowdfunding-explore-location>
        </div>
        <div class="column ">
          <skhemata-crowdfunding-explore-sort
            campaign-api-host="${this.campaignApiHost}"
            campaign-page-path="${this.campaignPagePath}"
          ></skhemata-crowdfunding-explore-sort>
          <skhemata-crowdfunding-explore-grid
            campaign-api-host="${this.campaignApiHost}"
            campaign-page-path="${this.campaignPagePath}"
            @campaignload=${this.handleCampaignLoad}
          ></skhemata-crowdfunding-explore-grid>
          <skhemata-crowdfunding-explore-pager
            campaign-api-host="${this.campaignApiHost}"
            campaign-page-path="${this.campaignPagePath}"
            total-pages=${this.totalPages}
          ></skhemata-crowdfunding-explore-pager>
        </div>
      </div>
    `;
  }
}
