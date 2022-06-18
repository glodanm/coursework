import { Link } from 'react-router-dom';
import { student, secondTitle, title } from '../utils/constants';

const Intro = () => {
    return (
        <div className='info'>
            <div className="header-info">
                <h1>{title}</h1>
                <p>{secondTitle}</p>
                <p>{student}</p> 
                <p>Тема моєї курсової роботи - "Секундомір"</p>
                <p>Коротка інструкція:</p>
                <p>Кнопка D: start/stop</p>
                <p>Кнопка #: save time</p>
                <p>Кнопка С: clear time</p>
            </div>

            <div className='button-info'>
                <Link to='/Home'><button className='button'>Start</button></Link>    
            </div>
        </div>

    )
}

export default Intro;