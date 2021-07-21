/**
 * 
 * Lit Blog Post Styles
 * 
 **/

import { css } from 'lit-element';

export const CampaignSharedStyles = css`
  :host {
    display: block;
    
    --default-text-color: #5c6265;
    --light-grey-color: #969ea2;
    --lighter-grey-color: #dce3e6;
    
    color: var(--default-text-color);
  }

  *,
  *::before,
  *::after {
    -webkit-box-sizing : border-box;
    box-sizing : border-box;
  }
  
  html, body, p, ol, ul, li, dl, dt, dd, blockquote, figure, fieldset, legend, textarea, pre, iframe, hr, h1, h2, h3, h4, h5, h6, strong, em {
    color: var(--default-text-color);
  }

  a {
    color: #3295dc;
    -webkit-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }

  a:hover {
    color: #1c77b9;
  }

  .card {
    color: var(--default-text-color);
  }

`;
