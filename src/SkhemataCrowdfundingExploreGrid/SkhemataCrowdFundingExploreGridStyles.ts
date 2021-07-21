/**
 * 
 * Lit campaign List Styles
 * 
 **/

import { css } from 'lit-element';

export const SkhemataCrowdfundingExploreGridStyles = css`
  :host {
    display: block;
    margin: 40px 0;

    --default-text-color: #5c6265;
    --light-grey-color: #969ea2;
    --lighter-grey-color: #dce3e6;
    
    color: var(--default-text-color);
  }

  .campaign-list {
    padding-top: 25px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
  }
  
  .campaign-item {
    overflow: hidden;
    box-shadow: 0 0 0 1px var(--lighter-grey-color);
    margin-bottom: 50px;
    border-radius: 4px;
    text-align: center;
  }

  .campaign-author-info {
    margin-top: -80px;
    margin-bottom: 30px;
  }

  .campaign-title.title {
    margin-bottom: 10px;
  }

  .campaign-author-info .image {
    display: inline-block;
  }

  .campaign-post-date {
    margin: 6px 0;
  }

  .campaign-excerpt {
    margin-top: 15px;
  }
  
  .load-more-button {
    text-align: center;
  }

  .load-more-button .button {
    padding: 8px 28px;
  }


.arrow-right {
  height: 80px;
  right: -50px;
  position: absolute;
  top: -50px;
  width: 85px;
  -webkit-transform: rotate(-45deg);
  z-index: 10;
}

.arrow-right span {
  color: #f5f5f5;
  font-family: sans-serif;
  font-size: 1.005em;
  right: 35px;
  top: 8px;
  position: absolute;
  width: 80px;
  -webkit-transform: rotate(-270deg);
}

.campaign-ended{
  position: absolute;
  font-size: 0.7rem !important;
  font-weight: bold !important;
  top: 35px !important;
  right: 35px !important;
}

.first {
  background-color: #D95C5C !important;
}

.second {
  background-color: #3B83C0 !important;
}

.third {
  background-color: #5BBD72 !important;
}

.campaign-featured-img {
  background-img = url("https://cdn5.thrinacia.com/coral/images/placeholder-images/placeholder_campaign.png")
}


`;
