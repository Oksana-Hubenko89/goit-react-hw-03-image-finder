import React from 'react';
import s from './ImageGalleryItem.module.css';


function ImageGalleryItem({ onClick, images} ) {
    return (<>
        {
            images.map(({ id, tags, webformatURL ,largeImageURL}) =>
                <li key={id} className={s.ImageGalleryItem} onClick={()=>onClick(largeImageURL)}>
                    <img src={webformatURL}  alt={tags} className={s.ImageGalleryItemImage} style={{ minHeight: 40 }} />
                </li>)
           
        } 
        </>
    )
};
   
        
    
      

    
 


export default ImageGalleryItem;