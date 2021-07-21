/**
 * 
 * Lit Campaign Pagination Element
 * 
 **/

// Import litelement base class, html helper function & typescript decorators
import { html, LitElement}  from 'lit-element';
//1.
const PAGINATION_SIZE = 10;
//2.
const LIMIT_PER_PAGE =10;
export class 
 PaginatorComponent
 extends LitElement {
    //3.
    //4.
    //5.
    //6.
    //7.
render() {
  return html`
   <nav aria-label="Page 
     navigation">
     <ul class="pagination mb-5" 
       id="pagination">
     </ul>
  </nav>
  `
 }
}
