import { Component } from 'react';
import './App.css';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Container from '../Container';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {

    static defaultProps = {
      // 
    }
    static propTypes = {
      //
    }

  state = {
      images:null,
      page: 1,
      imageName: null,
    };

  
  componentDidMount() {
        console.log('App componentDidMount');
        const images = sessionStorage.getItem("images");
        const parsedImages = JSON.parse(images);

        if (parsedImages) {
          console.log('App componentDidMount images');
                this.setState({ images:parsedImages});
          }
      
        //     const page = sessionStorage.getItem("page");
        //     const parsedPage = JSON.parse(page);
        
        // if (parsedPage) {
        //   console.log('App componentDidMount page');
        //         this.setState({ page: parsedPage });
        //   }
      
            const image= sessionStorage.getItem("imageName");
        const parsedImage = JSON.parse(image);
        
        if (parsedImage) {
          console.log('App componentDidMount imageName');
            this.setState({ imageName: parsedImage });
          }
  };
  
  componentDidUpdate() {
            sessionStorage.setItem('imageName', JSON.stringify(this.state.imageName));
            sessionStorage.setItem('page', JSON.stringify(this.state.page));
            sessionStorage.setItem('images', JSON.stringify(this.state.images));
    }
  
    handleFormSubmit = imageName => {
      this.setState({ imageName });
      this.resetPage();
    };
  
    incrementPage =()=> {
      this.setState(({ page }) =>
        ({ page: page + 1 }));
    };

    resetPage = () => {
      this.setState({ page: 1 })
    };

    render() {
    
      const { imageName, page } = this.state;
      const { images } = this.state;
      
      return (
        <Container>
          <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>
          <ImageGallery imageName={imageName} scroll={this.scroll} page={page}  images={images} incrementPage={this.incrementPage} />
          <ToastContainer autoClose={3000} /> 
        </Container>
      )
  }

}

export default App;
