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
    page: 1,
    imageName: null,
  };
  
  incrementPage = () => {
    this.setState(({ page }) =>
      ({ page: page + 1 }));
  };

  decrementPage = () => {
    this.setState(({ page }) =>
      ({ page: page - 1 }));
  };

  componentDidMount() {
    console.log('App componentDidMount');
  
    const imageName = localStorage.getItem("imageName");
    const parsedImages = JSON.parse(imageName);

    if (parsedImages) {
      this.setState({ imageName: parsedImages });
    }
  };
  

 componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate');

    if (this.state.imageName !== prevState.imageName) {
      console.log('Oбновилось поле images, записываю в хранилище');

     localStorage.setItem('imageName', JSON.stringify(this.state.imageName));
    }
  };
      
  handleFormSubmit = imageName => {
    this.setState({ imageName });
    this.resetPage();
  };
  resetPage = () => {
    this.setState({page:1})
  }

  render() {
    //console.log("App render");
 
   
    const {imageName, page} = this.state;
    
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>
        <ImageGallery  imageName={imageName} page={page} incrementPage={this.incrementPage} decrementPage={this.decrementPage} />
        <ToastContainer autoClose={3000} /> 
      </Container>
    )
  }

}

export default App;
