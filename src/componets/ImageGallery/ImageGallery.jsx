import React, { PureComponent } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import s from './ImageGallery.module.css';
//import imageApi from '../imageApi';
import ImageErrorView from '../ImageErrorView';
import Button from '../Button';
import Loader from '../Loader';
import Modal from '../Modal';
import { toast } from 'react-toastify';


class ImageGallery extends PureComponent {
     static defaultProps = {
     //
  }
    
    state = {
        showModal:false,
        largeImageURL: null,
        per_page:12,
        images: [],
        error: null,
        status: 'idle',
    };
   
  componentDidMount() {
    console.log('App componentDidMount');
  
    const images = localStorage.getItem("images");
    const parsedImages = JSON.parse(images);

    if (parsedImages) {
      this.setState({ images: parsedImages });
    }
    };

    componentDidUpdate(prevProps, prevState) {

        const prevImage = prevProps.imageName;
        const nextImage = this.props.imageName;
        const prevPage = prevProps.page;
        const nextPage = this.props.page;
              
       const  KEY= '19267530-a7778ead7c20bf1fd9d6edf89';
   
       const API = `https://pixabay.com/api/?q=${nextImage}&page=${nextPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${this.state.per_page}`;
        if (nextImage !== prevImage || nextPage !== prevPage) {
            this.setState({ status: 'pending' });
            //imageApi
            fetch(API)
                .then(response => response.json())
                    
                .then(data => {
                    if (data.hits.length > 0) {
                        return (
                            this.setState(({images })=>({images:[...data.hits] })),
                            this.setState({ status: 'resolved' }))
                    }
                    return Promise.reject(
                        new Error(`Нет картинки с имененeм ${nextImage}`),);
                
                } )
                        
                .catch(error => this.setState({ error, status: 'rejected' }))
                .finally(this.props.scroll)
            };
    };

    togleModal = largeImageURL => {
        this.setState(({ showModal }) => ({
            showModal: !showModal
        }));
        this.setState(({ largeImageURL }));
        
    };
    
    handleDecrement = () => {
        if (this.props.page > 1) {
            this.props.decrementPage();
        this.props.scroll();
            return;  
        }
        return toast.error(`Please click on Search more... or enter a new name image`);
        
   };

    handleIncrement=()=> {
        if (this.state.images.length > 0) {
            this.props.incrementPage();
        this.props.scroll();
        return;
           
        }
        return toast.error(`Enter a new name image or click Back...`); 
  }; 

        render() {
            const {error, status , images, largeImageURL, showModal} = this.state;
            
            const {togleModal} = this;

            if (status === 'idle') {
                return <div>Введите название картинки</div>
            };

            if (status === 'pending') {
                return <Loader/>
            };

            if (status === 'resolved') {
                return < >
                
                    <ul className={s.ImageGallery}>
                        <ImageGalleryItem images={images} onClick={this.togleModal} largeImageURL={largeImageURL} />
                        
                         {showModal && <Modal togleModal={togleModal} largeImageURL={largeImageURL}/> }
                    </ul>
                    <Button onSubmit={this.handleIncrement}>Search more...</Button>
                    <Button onSubmit={this.handleDecrement}>Back...</Button>
                   
          
                    </>
            };

            if (status === 'rejected') {
                return <ImageErrorView message={error.message} />
            };
        
        }
    
    }

export default ImageGallery;