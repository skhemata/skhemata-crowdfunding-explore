/**
 * 
 * Use ExtractUrlFromString to return the url from random string
 * 
*/
export const ExtractUrlFromString = (string: String) => {
    if (string) {
        const matches = string.match(/\bhttps?:\/\/\S+/gi);

        if(matches && matches.length){
            const lastChar = matches[0].slice(-1);
            if( lastChar == '"'){
                const urlResult = matches[0].slice(0, -1);
                return `${urlResult}`;
            } else {
                const urlResult = matches[0];
                return `${urlResult}`;
            }
        }
    }
    return true;
}