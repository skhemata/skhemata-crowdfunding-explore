/**
 * 
 * Lit Campaign Name Search Element
 * 
 **/
// Import litelement base class, html helper function & typescript decorators
import { LitElement, html, property } from 'lit-element';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { SkhemataFormTextbox } from 'skhemata-form';

// Import custom style elements
import { Bulma } from 'skhemata-css'
import { SkhemataCrowdfundingExploreSearchStyles } from './SkhemataCrowdFundingExploreSearchStyles';

export class SkhemataCrowdfundingExploreSearch extends ScopedElementsMixin(LitElement) {
    // Property decorator (requires TypeScript or Babel)
    // Attributes that can be passed into different elements
    @property({ type: String, attribute: 'campaign-api-host' })
    campaignSiteHost = '';

    @property({ type: String, attribute: 'campaign-page-path' })
    campaignPagePath = '';

    @property({ type: String })
    searchedCampaignPosts = '';

    // Component specific properties
    @property({ type: String })
    apiPath = '/service/restv1/campaign';

    @property({ type: String})
    private searchTerm: String | null = "";


    static get styles() {
        return [
            Bulma,
            SkhemataCrowdfundingExploreSearchStyles
        ];
    }

    constructor() {
        // Always call super() first
        super();
        const params = new URLSearchParams(window.location.search);
        this.searchTerm = params.get('s');
    }

    static get scopedElements() {
        return {
            'skhemata-form-textbox': SkhemataFormTextbox,
        };
    }

    /**
   * Implement `render` to define a template for your element.
   * Use JS template literals
   */
    protected render() {
        return html`
            <skhemata-form-textbox id="search-input" label="Search Campaign Name" name="search-campaign" placeholder="" 
            @keyup="${this.enterSearch}"
            ></skhemata-form-textbox>
        `;

        // return html`
        // <div class="search-control control">
        // <input id="search-input" value="${this.searchTerm || ""}" type="text" class="input is-medium" placeholder="Search..."
        //     @change=${this.onSearch}>
        // </div>
        // `;
    }

    /**
     *  Search posts when value is entered
     */
    enterSearch(event: any){
        if (event.key === 'Enter' || event.keyCode === 13) {
           this.onSearch(event);
        }
    }

    onSearch(event: any) {
        const params = new URLSearchParams(window.location.search);
        params.set('s', event.target.value);
        window.location.href= `/${this.campaignPagePath}?${params.toString()}`;
    }

}
