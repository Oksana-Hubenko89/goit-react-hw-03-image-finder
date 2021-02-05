import React from 'react';
import s from './ImageGalleryItem.module.css';


const ImageGalleryItem=({ onClick,src, alt,largeImageURL })=> 
                <li  className={s.ImageGalleryItem} onClick={()=>onClick(largeImageURL)}>
                    <img src={src}  alt={alt} className={s.ImageGalleryItemImage} style={{ minHeight: 280}} />
                </li>
;
  
export default ImageGalleryItem;