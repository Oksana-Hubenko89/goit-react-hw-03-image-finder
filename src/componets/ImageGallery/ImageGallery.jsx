import React, { PureComponent } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import s from './ImageGallery.module.css';
import imageApi from '../../service/imageApi';
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
            this.setState({ status: 'resolved' });
      }
      
    };

    componentDidUpdate(prevProps, prevState) {
      
        const prevImage = prevProps.imageName;
        const nextImage = this.props.imageName;
        const prevPage = prevProps.page;
        const nextPage = this.props.page;

        localStorage.setItem('images', JSON.stringify(this.state.images));

        if (nextPage !== prevPage || nextImage !== prevImage )  {

            this.setState({ status: 'pending' });
            
        imageApi.fetchImage({ nextImage, nextPage })
            .then(data => {

                if (data.hits.length !== 0) {
                    if (nextImage !== prevImage) {
                        return (
                            this.setState({ images: [...data.hits] }),
                            this.setState({ status: 'resolved' })
                        )
                    };

                    if (nextImage === prevImage ) {
                        return (
                            this.setState(({ images }) => ({ images: [...images, ...data.hits] })),
                            this.setState({ status: 'resolved' }))
                    };
                   
                    return this.setState({ status: 'resolved' });
                     
                }   
                
                return Promise.reject(
                        new Error(`Нет картинки с имененeм ${nextImage}`),); 
                
            })
            
            .catch(error => this.setState({ error, status: 'rejected' }))
            .finally(this.scroll)}
    };

    scroll = () => {
        window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
    
    togleModal = largeImageURL => {
        this.setState(({ showModal }) => ({
            showModal: !showModal
        }));
        this.setState(({ largeImageURL }));
    };
    
    handleIncrement = () => {
        if (this.state.images.length > 0) {
            localStorage.removeItem('images');
            this.props.incrementPage();
        return;
        };
        return toast.error(`Enter a new name image or click Back...`); 
    }; 

        render() {
            const {error, status , images, largeImageURL, showModal} = this.state;
            const {togleModal} = this;

            if (status === 'idle') {
                return <div>Введите название картинки</div>
            };

            if (status === 'resolved' || status === 'pending') {
                return < >
                
                    <ul className={s.ImageGallery}>
                        {images.map(({ largeImageURL, tags, webformatURL  }) =>
                        (<ImageGalleryItem key={largeImageURL} images={images} onClick={this.togleModal} src={webformatURL} alt={ tags} largeImageURL={largeImageURL} />
                        ))
                        }
                        
                    </ul>
                     {showModal && <Modal togleModal={togleModal} largeImageURL={largeImageURL}/> }
                  {status === 'pending'?<Loader/>: <Button onSubmit={this.handleIncrement}>Search more...</Button>}
                    </>
            };

            if (status === 'rejected') {
                return <ImageErrorView message={error.message} />
            };
        }
    
    }

export default ImageGallery;