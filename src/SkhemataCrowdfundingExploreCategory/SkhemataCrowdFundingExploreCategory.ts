/**
 * 
 * Lit Blog Search Element
 * 
 **/

// Import litelement base class, html helper function & typescript decorators
import { LitElement, html, property } from 'lit-element';

// Import lit-html, directives & etc
// import { repeat } from 'lit-html/directives/repeat';

// Import custom style elements
import { Bulma } from 'skhemata-css'
import { SkhemataCrowdfundingExploreCategoryStyles } from './SkhemataCrowdFundingExploreCategoryStyles';

// Import custom element directives

// Import element dependencies
// import {debounce} from 'lodash';
export class SkhemataCrowdfundingExploreCategory extends LitElement {

  // Property decorator (requires TypeScript or Babel)
  // Attributes that can be passed into different elements
    @property({ type: String, attribute: 'campaign-api-host' })
    campaignApiHost = '';

    @property({ type: String, attribute: 'campaign-page-path' })
    campaignPagePath = '';

    @property({ type: String })
    apiPath = '/service/restv1/portal/category';

    @property({ type: Array })
    categories = [];

    static get styles() {
        return [
        Bulma,
        SkhemataCrowdfundingExploreCategoryStyles
        ];
    }

    constructor() {
    // Always call super() first
        super();
    }


    /**
     * Implement `render` to define a template for your element.
     * Use JS template literals
     */
    protected render() {

    const params = new URLSearchParams(window.location.search);
    const currentCategory = params.getAll('c').toString();

    return html`
        <div class="category-container">
            <label class="label">Categories</label>
            ${this.categories.map((category: any)=> html `
            <button class="category-item button is-light is-fullwidth ${(currentCategory.includes(category.id)) ? 'active' : ''}" value="${category.id}" @click="${this.filterCategory}">${category.name}</button>
        </div>`)}
    `;
    }

    firstUpdated(){
    this.getCategories();
    }
    
    /**
   *  Get categories 
   */
    private async getCategories(){
    await fetch(`${this.campaignApiHost}${this.apiPath}`)
    .then(response => response.json())
    .then(async data => {
        this.categories = data;
        });
    }

    filterCategory(event: any){
        let params = new URLSearchParams(window.location.search);
        const str = params.toString();
        
        if(str.includes(event.target.value)){
            const updateStr = str.replace(`c=${event.target.value}`, '');
            params = new URLSearchParams(updateStr);
        }
        else{
            params.append('c', event.target.value);
        }
        window.location.href= `/${this.campaignPagePath}?${params.toString()}`;
    }
}