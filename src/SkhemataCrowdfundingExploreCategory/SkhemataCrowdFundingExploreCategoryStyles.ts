/**
 * 
 * Lit Campaign Categories Styles
 * 
 **/

import { css } from 'lit-element';

export const SkhemataCrowdfundingExploreCategoryStyles = css`
    :host {
        display: block;
        padding-top: 25px;
        margin: 40px 0;

        --default-text-color: #5c6265;
        --light-grey-color: #969ea2;
        --lighter-grey-color: #dce3e6;
        
        color: var(--default-text-color);
    }

    .category-item {
        margin-bottom: 10px;
        height: auto;
    }

    .category-item.active { 
        background: lightgrey
    }
    .category-item.active:hover { 
        background: lightgrey
    }

    .category-item:last-child {
        margin-bottom: 0;
    }

    .category-container {
        padding-right: 2rem;
    }
`;
