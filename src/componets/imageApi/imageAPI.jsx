function fetchImage({ nextImage,page}) {
    
    
    const KEY= '19267530-a7778ead7c20bf1fd9d6edf89';
   
    const API = `https://pixabay.com/api/?q=${nextImage}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    
    return fetch(API)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(new Error(`Нет картинки с имененeм ${nextImage}`));
        });
        


        
};
const api = {
    fetchImage,
};

export default api;
