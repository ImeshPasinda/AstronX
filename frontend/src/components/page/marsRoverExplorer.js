import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Skeleton, Stack, Text, SimpleGrid, Card, CardHeader, Heading, CardBody, CardFooter, Image } from '@chakra-ui/react';
import { MARS_IMAGE } from '../../constant/imageConstant';
import { EMRI_SUB_DESCRIPTION } from '../../constant/commonConstant';
import { API_GET_EMRI } from '../../constant/apiConstant';

//demo data replace with (response.data)
import demoData from '../asset/data/marsRoverData.json'

export default function MarsRoverExplorer() {

  const [emriData, setEmriData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const emriAccessed = localStorage.getItem('emri_accessed');
    if (!emriAccessed) {
      localStorage.setItem('emri_accessed', true);
    }
  }, []);

  useEffect(() => {
    const fetchEmriData = async () => {
      try {
        const response = await axios.get(`${API_GET_EMRI}`, {
          params: {
            api_key: process.env.REACT_APP_APOD_API_KEY
          }
        });

        setEmriData(response.data.photos);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Emri data:', error);
      }
    };

    fetchEmriData();
  }, []);

  const toggleShowAll = () => {
    setShowAll(prevShowAll => !prevShowAll);
  };

  const visibleData = emriData ? (showAll ? emriData : emriData.slice(0, 6)) : [];

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div style={{ marginBottom: '10%' }}>
      <div className="container" style={{ paddingTop: '75px' }}>
        <div className="row">
          <div className="col-md-4 p-5">
            <div className="card">
              <div className="card-body">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <h5>Mars Rover Pictures</h5>
                  <img src={MARS_IMAGE} style={{ display: 'inline', marginBottom: '20px' }} alt="User Avatar" />
                  <p className='text-muted'>{EMRI_SUB_DESCRIPTION}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 p-5">
            <h2 style={{ marginBottom: '25px' }}>Explore Mars with Rover Images<i className="fa fa-arrow-right" style={{ fontSize: '25px', paddingLeft: '10px', color: '#0056d2' }}></i></h2>
            {isLoading ? (
              <Stack>
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
              </Stack>
            ) : (
              <>
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                  {visibleData.map((item) => (
                    <Card
                      key={item.id}
                      maxW='sm'
                      borderRadius='20px'
                      boxShadow='0 0 0 1px #c7c7c7'
                      _hover={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}
                      padding='1px'
                    >
                      <CardHeader>
                        <Heading size='md'>{item.rover.name}</Heading>
                      </CardHeader>
                      <CardBody>
                        <Text>
                          <strong>Rover Name:</strong> {item.rover.name}
                        </Text>
                        <Text>
                          <strong>Camera Name:</strong> {item.camera.full_name}
                        </Text>
                        <Text>
                          <strong>Earth Date:</strong> {item.earth_date}
                        </Text>
                        <Text>
                          <strong>Rover Status:</strong> {item.rover.status}
                        </Text>
                        <Text>
                          <strong>Sol:</strong> {item.sol}
                        </Text>
                        <Text>
                          <strong>Max Sol:</strong> {item.rover.max_sol}
                        </Text>
                        <Text>
                          <strong>Total Photos:</strong> {item.rover.total_photos}
                        </Text>
                        <Text>
                          <strong>Launch Date:</strong> {item.rover.launch_date}
                        </Text>
                        <Text>
                          <strong>Landing Date:</strong> {item.rover.landing_date}
                        </Text>
                      </CardBody>
                      <CardFooter>
                        <Button onClick={() => openModal(item.img_src)} cursor="pointer">View Image</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </SimpleGrid>
                <div className="buttons" style={{ paddingTop: '30px' }}>
                  {emriData && (
                    <Button bg='#0056d2' color='white' variant='solid' borderRadius='4px' size='lg' style={{ marginRight: '10px', marginTop: '10px' }} onClick={toggleShowAll}>
                      {showAll ? 'Show fewer' : `Show ${emriData.length - 6} more`} <i className="fa fa-arrow-right" style={{ fontSize: '20px', paddingLeft: '10px' }}></i>
                    </Button>
                  )}
                </div>
              </>
            )}

            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Mars Rover Picture</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Image src={selectedImage} />
                </ModalBody>
                <ModalFooter>
                  <Button onClick={closeModal}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

          </div>
        </div>
      </div>
    </div>
  );
}
