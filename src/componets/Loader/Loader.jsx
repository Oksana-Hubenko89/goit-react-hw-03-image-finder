
import { ImSpinner } from 'react-icons/im';
import pendingImage from './pending.png';
import f from './Loader.module.css';
  
const s = {
  spinner: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    fontSize: 24,
  },
};

const Loader = ({ imageName }) => {
    const images = {
        tags: imageName,
        webformatURL: pendingImage,
    };

    return (
        
    <div role="alert">
      <div style={s.Spinner}>
        <ImSpinner size="32" className={f.iconSpin} />
        Загружаем...
      </div>
        <img src={images.webformatURL} alt={images.tags}/>
    </div>

    )
};

export default Loader;