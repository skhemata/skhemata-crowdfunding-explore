/**
 * 
 * Use createContextualFragment to return the string to html
 * 
*/
export const StringToHtml = (string: String) => {
  if (string) {

    const fragmentResult = document.createRange().createContextualFragment(`${string}`);

    return fragmentResult;
  }

  return true;
}