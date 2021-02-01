import React from 'react';
import s from './ImageGalleryItem.module.css';


function ImageGalleryItem({ images,onClick,largeImageURL }) {
    return (<>
        {
            images.map(({ id, tags, webformatURL, }) =>
                <li key={id} className={s.ImageGalleryItem} onClick={()=>onClick(largeImageURL)}>
                    <img src={webformatURL} srcSet={largeImageURL} alt={tags} className={s.ImageGalleryItemImage} style={{ minHeight: 40 }} />
                </li>)
           
        } 
        </>
    )
};
   
        
    
      

    
 


export default ImageGalleryItem;