function fetchImage({ nextImage,nextPage}) {
    
    const  KEY= '19267530-a7778ead7c20bf1fd9d6edf89';
    const API = `https://pixabay.com/api/?q=${nextImage}&page=${nextPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    
    return fetch(API)
                .then(response => response.json())
};

const api = {
    fetchImage,
};

export default api;
