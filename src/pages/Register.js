import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL } from '../services/helper';

const Register = () => {
    const [username, setUserName] = useState('');
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setUserName(event.target.value);
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const formData = new FormData();
        formData.append('username', username);

        files.forEach((file) => {
            formData.append('userimg', file);
        });

        try {
            const response = await axios.post(`${BASE_URL}/user/api/register`, formData, config);

            if (response.status === 200) {
                setUserName('');
                setFiles([]);
                toast.success('Image successfully uploaded');
            } else {
                toast.error(response.data.error);
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Container style={{ marginTop: '10px' }}>
                <h1 className='text-center'>Upload Multiple Images</h1>
                <div className='d-flex flex-column justify-content-center'>
                    <Form className='w-50' onSubmit={handleSubmit}>
                        <Form.Group className='mb-3'>
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type='text'
                                value={username}
                                onChange={handleChange}
                                placeholder='username'
                                required
                            />
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Select Images</Form.Label>
                            <Form.Control
                                type='file'
                                onChange={handleFileChange}
                                multiple
                                required
                            />
                        </Form.Group>

                        <Button variant='primary' type='submit' disabled={loading}>
                            {loading ? 'Uploading...' : 'Submit'}
                        </Button>
                    </Form>
                </div>

                {/* Image Preview */}
                {files.length > 0 && (
                    <Container className='mt-2 d-flex justify-content-center'>
                        {files.map((file, index) => (
                            <Card key={index} style={{ width: '70px', height: '70px', marginLeft: '5px' }}>
                                <Card.Img variant='top' src={URL.createObjectURL(file)} />
                            </Card>
                        ))}
                    </Container>
                )}
            </Container>
        </>
    );
};

export default Register;
