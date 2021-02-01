import s from './Searchbar.module.css';
import f from './SearchForm.module.css';
import React, { Component } from 'react';
import { toast } from 'react-toastify';

class Searchbar extends Component {
  
     state = {
         imageName: '',
     }

    handleNameChange = e => {
            this.setState({ imageName: e.currentTarget.value.toLowerCase() });
        };

    handleSubmit = e => {
        e.preventDefault();

        if (this.state.imageName.trim() === '') {
        toast.error('Введите имя картинки');
        return;
        }

       this.props.onSubmit(this.state.imageName);
        this.setState({ imageName: ' ' });
    };
    componentDidUpdate(prevProps, prevState) {
        console.log('App componentDidUpdate');

        if (this.state.imageName !== prevState.imageName) {
        // console.log('Oбновилось поле imageName, записываю в хранилище');

        localStorage.setItem('imageName', JSON.stringify(this.state.imageName));
        }
   ;
    };
  
    
    render() {
       const { imageName } = this.state;
       const { handleSubmit, handleNameChange } = this;
        return (
      
            <header className={s.Searchbar}>
                <form className={f.SearchForm}
                    onSubmit={handleSubmit}
                >
                    <button type="submit" className={f.SearchFormButton}>
                        <span className={f.SearchFormButtonLabel}>Search</span>
                    </button>

                    <input
                        className={f.SearchFormInput}
                        type="text"
                        autoComplete="off"
                       autoFocus
                        value={imageName}
                        placeholder="Search images and photos"
                       onChange={handleNameChange}
                    />
                </form>
            </header>
            
        )
    }
}

export default Searchbar;

