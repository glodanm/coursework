import { useState, useEffect } from 'react';
import TimeButtons from '../../components/TimeButtons/TimeButtons';
import api from '../../utils/Api';
import TableTimes from '../../components/TableTimes/TableTimes';
import { Link } from 'react-router-dom';

const Home = () => {
    const [items, setItems] = useState([]);
    const handleButtonId = (id) => {
        if (id) {
            sendCommandToServer(id);
        }
    };

    useEffect(
        () => async () => {
            const res = await api.getItems();
            setItems(res.data);
        },
        [],
    );

    handleButtonId();

    const sendCommandToServer = async (command) => {
        const res = await fetch('http://127.0.0.1:5000/stopwatch', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(command),
        });
        if (res.status !== 200) {
            console.log('Error');
        } else {
            const result = await res.json();
            setItems(result);
        }
    };

    return (
        <>
            <div className="wrapper clear">
            <div>
                <Link to='/'><button className='button-back'>Back</button></Link>    
            </div>
                <div>
                    <TimeButtons
                        buttonId={['1', '2', '3', 'A']}
                        handleButtonId={handleButtonId}
                        buttonLabels={['1', '2', '3', 'A']}
                    />
                </div>
                <div>
                    <TimeButtons
                        buttonId={['4', '5', '6', 'B']}
                        handleButtonId={handleButtonId}
                        buttonLabels={['4', '5', '6', 'B']}
                    />
                </div>
                <div>
                    <TimeButtons
                        buttonId={['7', '8', '9', 'C']}
                        handleButtonId={handleButtonId}
                        buttonLabels={['7', '8', '9', 'C']}
                    />
                </div>
                <div>
                    <TimeButtons
                        buttonId={['*', '0', '#', 'D']}
                        handleButtonId={handleButtonId}
                        buttonLabels={['*', '0', '#', 'D']}
                    />
                </div>
                <div>
                    <TableTimes items={items} />
                </div>
            </div>
        </>
    );
};

export default Home;
