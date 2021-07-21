/**
 * 
 * Lit Campaign Name Search Element
 * 
 **/
// Import litelement base class, html helper function & typescript decorators
import { LitElement, html, property } from 'lit-element';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { SkhemataFormAutocomplete } from 'skhemata-form';

// Import lit-html, directives & etc
import { repeat } from 'lit-html/directives/repeat';

// Import custom style elements
import { Bulma } from 'skhemata-css'
import { SkhemataCrowdfundingExploreLocationStyles } from './SkhemataCrowdfundingExploreLocationStyles';

export class SkhemataCrowdfundingExploreLocation extends ScopedElementsMixin(LitElement) {
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
    localeSearchPath = '/service/restv1/locale/city/';

    @property({ type: String})
    private searchTerm: String | null = "";

    @property({ type: Array })
    cityArray = [];

    static get styles() {
        return [
            Bulma,
            SkhemataCrowdfundingExploreLocationStyles
        ];
    }

    static get scopedElements() {
        return {
        'skhemata-form-autocomplete': SkhemataFormAutocomplete,
        };
    }

    constructor() {
        // Always call super() first
        super();
        this.addEventListener('change', this.onSearchCity);
        // const params = new URLSearchParams(window.location.search);
        // this.searchTerm = params.get('city');
    }

    /**
   * Implement `render` to define a template for your element.
   * Use JS template literals
   */
    protected render() {
        // return html`
        // <skhemata-form-autocomplete
        //     api="${this.campaignApiHost}${this.localeSearchPath}"
        //     label="Location"
        //     name="location-search"
        //     maplabel="name" 
        //     mapvalue="city_id"
        //     placeholder="Input City Name"
        //     @click=${this.onSearchCity}
        // ></skhemata-form-autocomplete>
        // `;

        return html `
             <div class="search-control control">
                <label class="label">Search Location</label>
                <input id="search-input" value="${this.searchTerm || ""}" type="text" class="input is-medium" placeholder="Search..."
                @keyup=${this.onSearchCity}>
                <fa-icon icon="search"></fa-icon>
                ${this.displayCities(this.cityArray)}
            </div>
        `;
    }

    /**
     *  Search City from API
     */
    private onSearchCity(event: any) {
        console.log(event.target.value);
        fetch(`${this.campaignApiHost}${this.localeSearchPath}${event.target.value}`).then(response => {
            const contentType = response.headers.get('Content-Type');
            // Check if response header content type is json
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            }
            // Throw error if above condition isn't met
            throw new TypeError('The format is not JSON.');
        }).then(data => {
            this.cityArray = data;
            this.onSearch(this.cityArray);
        })
    }

    private displayCities(data: any) {
        if(data !== undefined && data.length > 1){
            return html `
                <div class="dropdown is-active">
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                        <div class="dropdown-content">
                            ${repeat(this.cityArray, (city: any) => city.city_id, (city) => html `
                                <a href="#" class="dropdown-item" id="${city.city_id}" @click=${this.onSearch} >
                                ${city.name}
                                </a>
                            `)}
                        </div>
                    </div>
                </div>
            `;
        }
    }



    /**
     *  Search posts when value is entered
     */
    onSearch(event: any) {
        const params = new URLSearchParams(window.location.search);
        if(event.target.id !== undefined){
            console.log(event.target.id);
            params.set('city', event.target.id);
            window.location.href= `/${this.campaignPagePath}?${params.toString()}`;
        }
    }

}
