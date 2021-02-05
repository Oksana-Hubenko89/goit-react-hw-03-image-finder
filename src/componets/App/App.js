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

             
  handleFormSubmit = imageName => {
   
      this.setState({ imageName });
      this.resetPage();

    };
  
    incrementPage = () => {
      this.setState(({ page }) =>
        ({ page: page + 1 }));
    };

    resetPage = () => {
      this.setState({ page: 1 })
    };

    render() {
    
      const {imageName, page} = this.state;
      
      return (
        <Container>
          <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>
          <ImageGallery imageName={imageName} scroll={this.scroll} page={page} incrementPage={this.incrementPage} />
          <ToastContainer autoClose={3000} /> 
        </Container>
      )
  }

}

export default App;
