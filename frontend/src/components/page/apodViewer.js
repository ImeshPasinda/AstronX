import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, SkeletonText, Box, Image, Stack, Skeleton } from '@chakra-ui/react';
import { API_GET_APOD } from '../../constant/apiConstant';

//demo data replace with (response.data)
import demoData from '../asset/data/apodData.json'

export default function ApodViewer() {

    const [apodData, setApodData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        const apodAccessed = localStorage.getItem('apod_accessed');
        if (!apodAccessed) {
            localStorage.setItem('apod_accessed', true);
        }
    }, []);

    useEffect(() => {
        const fetchApodData = async () => {
            try {
                const response = await axios.get(`${API_GET_APOD}`, {
                    params: {
                        api_key: process.env.REACT_APP_APOD_API_KEY
                    }
                });

                setApodData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching APOD data:', error);
            }
        };

        fetchApodData();
    }, []);

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    return (
        <div style={{ marginBottom: '10%' }}>
            <div className="container" style={{ paddingTop: '75px' }}>
                <div className="row">
                    <div className="col-md-4 p-5">
                        <div className="card">
                            <div className="card-body">
                                {isLoading ? (
                                    <SkeletonText mt='4' noOfLines={4} spacing='4' />
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <h4>{apodData.title}</h4>
                                        <p className='text-muted' style={{ marginTop: '15px' }}>{apodData.explanation}</p>
                                        <div style={{ marginTop: '15px' }}>
                                            {apodData.copyright ? (
                                                <p><strong>Copyright:</strong> {apodData.copyright}</p>
                                            ) : (
                                                <p><strong>Copyright:</strong> Undefined</p>
                                            )}
                                            <p><strong>Date:</strong> {apodData.date}</p>
                                            <p><strong>Version:</strong> {apodData.service_version}</p>
                                        </div>
                                    </div>

                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 p-5">
                        <h2 style={{ marginBottom: '25px' }}>Astronomy picture of the day<i className="fa fa-arrow-right" style={{ fontSize: '25px', paddingLeft: '10px', color: '#0056d2' }}></i></h2>
                        {isLoading ? (
                            <Stack>
                                <Skeleton height='20px' />
                                <Skeleton height='20px' />
                                <Skeleton height='20px' />
                            </Stack>
                        ) : (
                            <Box style={{ margin: '15px' }}>

                                <Box overflow="hidden" borderRadius="20px" onClick={toggleZoom} style={{ cursor: 'pointer' }}>
                                    <Image src={apodData.hdurl} alt='NASA APOD' style={{ width: '100%', height: 'auto', transition: 'transform 0.3s', transform: isZoomed ? 'scale(2)' : 'scale(1)' }} />
                                </Box>

                            </Box>
                        )}
                        <div className="buttons" style={{ paddingTop: '30px' }}>
                            <Button bg='white' color='#0056d2' borderColor='#0056d2' variant='outline' borderRadius='4px' size='lg' style={{ marginRight: '10px', marginTop: '10px' }}>
                                <i className="fa fa-info-circle" style={{ fontSize: '20px', paddingRight: '10px' }} />More info
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
