/**
 * 
 * Lit Blog Post Styles
 * 
 **/

import { css } from 'lit-element';

export const SkhemataCrowdfundingExploreLocationStyles = css`
  :host {
    display: block;
    margin: 40px 0;
    
    --default-text-color: #5c6265;
    --light-grey-color: #969ea2;
    --lighter-grey-color: #dce3e6;

  }

  .search-control {
    position: relative;
  }

  fa-icon {
    width: 30px;
    display: inline-block;
    position: absolute;
    top: 15px;
    right: 20px;
    pointer-events: none;
  }

  fa-icon::slotted(*){
    color: rgba(10, 10, 10, 0.05);
  }

  #search-input {
    padding-right: 60px;
  }
`;
