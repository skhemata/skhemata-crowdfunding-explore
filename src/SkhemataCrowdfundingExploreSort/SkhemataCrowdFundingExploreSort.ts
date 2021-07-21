/**
 * 
 * Lit Skhemata Crowd Funding Campaign Sort Element
 * 
 **/

// Import litelement base class, html helper function & typescript decorators
import { LitElement, html, property } from 'lit-element';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';


import { SkhemataFormDropdown } from 'skhemata-form';

// Import custom style elements
import { Bulma } from 'skhemata-css';
import { SkhemataCrowdfundingExploreSortStyles } from './SkhemataCrowdFundingExploreSortStyles';

// Import element dependencies
export class SkhemataCrowdfundingExploreSort extends ScopedElementsMixin(LitElement) {

  // Property decorator (requires TypeScript or Babel)
  // Attributes that can be passed into different elements
    @property({ type: String, attribute: 'campaign-api-host' })
    campaignApiHost = '';

    @property({ type: String, attribute: 'campaign-page-path' })
    campaignPagePath = '';

    @property({ type: String })
    apiPath = '/service/restv1/campaign';

    @property({ type: String })
    sort = '';

    static get styles() {
        return [
        Bulma,
        SkhemataCrowdfundingExploreSortStyles
        ];
    }

    constructor() {
        // Always call super() first
        super();
    }

    static get scopedElements() {
        return {
            'skhemata-form-dropdown': SkhemataFormDropdown,
        };
    }

    handleSubmit(event: any){
        let params = new URLSearchParams(window.location.search);
        const selectedSort  = event.target.value;
        if(params.get('sort') == selectedSort){
            params.delete('sort');
        } else {
            params.set('sort', event.target.value)
        }
        window.location.href= `/${this.campaignPagePath}?${params.toString()}`;
    }

    /**
     * Implement `render` to define a template for your element.
     * Use JS template literals
     */
    protected render() {

        const params = new URLSearchParams(window.location.search);
        const currentSort = params.get('sort');

        let selected = '';
        switch(currentSort) {
        case "-created":
            selected = "Newest";
            break;
        case "created":
            selected = "Oldest";
            break;
        case "*-funded_percentage":
            selected = "Most Funded";
            break;
        case "*funded_percentage":
            selected = "Least Funded";
            break;
        case "*random()":
            selected = "Random";
            break;
        default:
            selected = "Sort By";
        }

        return html`
            <skhemata-form-dropdown label="Sort" name="mydropdown" placeholder=${selected}>
                <option @click=${this.handleSubmit} value="-created">Newest</option>
                <option @click=${this.handleSubmit} value="created">Oldest</option>
                <option @click=${this.handleSubmit} value="*-funded_percentage">Most Funded</option>
                <option @click=${this.handleSubmit} value="*funded_percentage">Least Funded</option>
                <option @click=${this.handleSubmit} value="*random()">Random</option>
            </skhemata-form-dropdown> 
        `;
    }

}