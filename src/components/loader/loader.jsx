import { CirclesWithBar } from 'react-loader-spinner';
import './loader.css';
export const Loader = () => {
    return (
        <div className='loader'>
            <CirclesWithBar
                color={'#27374D'}
                className='loading'
                height="300"
                width="300"
                radius="20" />
        </div>
    );
};