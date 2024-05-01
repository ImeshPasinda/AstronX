import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, SkeletonText, Box, Image, Stack, Skeleton } from '@chakra-ui/react';
import { API_GET_TES } from '../../constant/apiConstant';
import { LATITUDE, LONGITUDE, TES_SUB_DESCRIPTION } from '../../constant/commonConstant';
import { EARTH_IMAGE } from '../../constant/imageConstant';

//demo data replace with (response.data)
import demoData from '../asset/data/tesData.json'

export default function EarthObservationTracker() {

  const [tesData, setTestData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const tesAccessed = localStorage.getItem('tes_accessed');
    if (!tesAccessed) {
      localStorage.setItem('tes_accessed', true);
    }
  }, []);

  useEffect(() => {
    const fetchTesData = async () => {
      try {
        const response = await axios.get(`${API_GET_TES}`, {
          params: {
            api_key: process.env.REACT_APP_APOD_API_KEY
          }
        });

        setTestData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching TES data:', error);
      }
    };

    fetchTesData();
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
                    <h4>{tesData.id}</h4>
                    <img src={EARTH_IMAGE} style={{ display: 'inline', marginBottom: '20px' }} alt="User Avatar" />
                    <p className='text-muted'>{TES_SUB_DESCRIPTION}</p>
                    <div style={{ marginTop: '10px' }}>
                      <p><strong>Latitude :</strong> {LATITUDE}</p>
                      <p><strong>Longitude :</strong> {LONGITUDE}</p>
                      <p><strong>Date:</strong> {tesData.date}</p>
                      <p><strong>Service Version:</strong> {tesData.service_version}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-8 p-5">
            <h2 style={{ marginBottom: '25px' }}>Track Earth from Space with Satellite Imagery<i className="fa fa-arrow-right" style={{ fontSize: '25px', paddingLeft: '10px', color: '#0056d2' }}></i></h2>
            {isLoading ? (
              <Stack>
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
              </Stack>
            ) : (
              <Box style={{ margin: '15px' }}>

                <Box overflow="hidden" borderRadius="20px" onClick={toggleZoom} style={{ cursor: 'pointer' }}>
                  <Image src={tesData.url} alt='NASA APOD' style={{ width: '100%', height: 'auto', transition: 'transform 0.3s', transform: isZoomed ? 'scale(2)' : 'scale(1)' }} />
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

