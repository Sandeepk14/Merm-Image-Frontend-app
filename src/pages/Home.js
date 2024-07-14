import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { BASE_URL } from '../services/helper';

const Home = () => {
    const [userdata, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handlegetUserdata = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/api/getUser`);
            if (response.status === 200) {
                setUserData(response.data);
            } else {
                setError('Error fetching data');
            }
        } catch (error) {
            setError('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handlegetUserdata();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Container>
            <h1 className='text-center'>User Data</h1>
            <div className='d-flex justify-content-between flex-wrap'>
                {userdata.length > 0 ? (
                    userdata.map((element) => (
                        <Card key={element.id} style={{ width: '20rem', marginBottom: '5px' }}>
                            <Card.Body>
                                <Card.Title style={{ fontWeight: 'bold' }}>{element.username}</Card.Title>
                            </Card.Body>
                            <div className='d-flex justify-content-start p-3'>
                                {element.userprofile.length > 0 && element.userprofile.map((ele, index) => (
                                    <Card.Img
                                        key={index}
                                        style={{ width: '50px', height: '50px', borderRadius: '50%', marginTop: '3px' }}
                                        src={`http://localhost:4006/uploads/${ele}`}
                                    />
                                ))}
                            </div>
                        </Card>
                    ))
                ) : (
                    <div>No user data available</div>
                )}
            </div>
        </Container>
    );
};

export default Home;
