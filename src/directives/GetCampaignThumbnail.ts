/**
 * 
 * Use GetCampaignThumbnail to return the image url string
 * 
*/


export const GetCampaignThumbnail = (array: any[]) => {

    if(array){
        let imgUrl = array.map(file => {
            if(file.region_name=="Campaign Thumbnail"){
                return `${file.path_external}`;
            } else {
                return ``;
            }
        })
        return imgUrl;
    }
    
    return '';
}
