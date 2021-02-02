import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    state = {
        largeImageURL: '',
    }
    componentDidMount() {
        console.log("Modal componentDidMount");
        window.addEventListener('keydown', this.handleKeyDown); 
    }
    componentWillUnmount() {
        console.log("Modal componentWillUnmount ");
        window.removeEventListener('keydown', this.handleKeyDown); 
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
                console.log('Close modal');
                this.props.togleModal();
            } 
    }

    handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            this.props.togleModal();
      }  
    }

    render() {
        const { largeImageURL } = this.state;
        return createPortal(
            <div className={s.Overlay} onClick={this.handleBackdropClick}>
                <div className={s.Modal}> <img src={largeImageURL} alt='' /></div>
            </div>,
            modalRoot
        );
    }
}

export default Modal;