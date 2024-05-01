import React, { useEffect, useState } from 'react';
import { SkeletonCircle, SkeletonText, Text, SimpleGrid, Card, Heading, CardBody, CardFooter, Image, Stack, IconButton } from '@chakra-ui/react';
import useUserAuthInfo from '../authentication/useUserAuthInfo';
import { APOD_CARD_IMAGE, EMRI_CARD_IMAGE, NASA_LOGO, TES_CARD_IMAGE, USER_AVATAR } from '../../constant/imageConstant';
import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons'
import { APOD_DESCRIPTION, EMRI_DESCRIPTION, TES_DESCRIPTION, VERSION } from '../../constant/commonConstant';
import { NAVIGATE_TO_APOD, NAVIGATE_TO_EMRI, NAVIGATE_TO_TES } from '../../constant/routeConstant';
import { maskEmail } from '../../utils/utility';

export default function Profile() {
  const userDetails = useUserAuthInfo();
  const [cardVisibility, setCardVisibility] = useState({
    apod: localStorage.getItem('apod_accessed'),
    emri: localStorage.getItem('emri_accessed'),
    tes: localStorage.getItem('tes_accessed')
  });

  useEffect(() => {
    // Check if each card has been accessed and update the state
    const apodAccessed = localStorage.getItem('apod_accessed');
    const emriAccessed = localStorage.getItem('emri_accessed');
    const tesAccessed = localStorage.getItem('tes_accessed');
    setCardVisibility({
      apod: apodAccessed,
      emri: emriAccessed,
      tes: tesAccessed
    });
  }, []);

  const handleDeleteAll = () => {
    // Clear all items from local storage
    localStorage.removeItem('apod_accessed');
    localStorage.removeItem('emri_accessed');
    localStorage.removeItem('tes_accessed');
    // Update state to hide all cards
    setCardVisibility({
      apod: false,
      emri: false,
      tes: false
    });
  };

  return (
    <div style={{ marginBottom: '10%' }}>
      <div className="container" style={{ paddingTop: '75px' }}>
        <div className="row">
          <div className="col-md-4 p-5">
            <div className="card">
              <div className="card-body">
                {userDetails ? (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                      <img src={USER_AVATAR} style={{ height: '100px', width: '100px', display: 'inline', marginBottom: '20px' }} alt="User Avatar" />
                      <h5>{userDetails.username}<CheckCircleIcon w={4} h={4} color="#0056d2" marginLeft={0.5} marginBottom={1} /></h5>
                      <p>{maskEmail(userDetails.email)}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px' }}>
                      <SkeletonCircle size='20' />
                    </div>
                    <SkeletonText mt='4' noOfLines={4} spacing='4' />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-8 p-5">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ marginBottom: 0 }}>your readings<i className="fa fa-arrow-right" style={{ fontSize: '25px', paddingLeft: '10px', color: '#0056d2' }}></i></h2>
              {cardVisibility.apod || cardVisibility.emri || cardVisibility.tes ? (
                <IconButton onClick={handleDeleteAll} aria-label='Search database' icon={<DeleteIcon />} />
              ) : null}
            </div>
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
              {!cardVisibility.apod && !cardVisibility.emri && !cardVisibility.tes && (
                <div>No history available</div>
              )}
              {cardVisibility.apod && (
                <Card
                  key="apod"
                  maxW='sm'
                  borderRadius='20px'
                  boxShadow='0 0 0 1px #c7c7c7'
                  _hover={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}
                >
                  <CardBody>
                    <Image
                      src={APOD_CARD_IMAGE}
                      alt=''
                      borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                      <div className="card-body d-flex align-items-center">
                        <img src={NASA_LOGO} className="card-logo-top img-with-border" alt="..." />
                        <h6 style={{ color: 'gray', fontWeight: 400, fontSize: 15, marginLeft: '10px' }}>NASA Open API's</h6>
                      </div>
                      <Heading size='md'>Astronomy picture of the day</Heading>
                      <Text noOfLines={3} overflow="hidden" textOverflow="ellipsis">
                        {APOD_DESCRIPTION}
                      </Text>
                    </Stack>
                  </CardBody>
                  <CardFooter>
                    <div className="col text-start">
                      <h6 style={{ color: '#0056d2', fontWeight: 400, fontSize: 15 }}>
                        <i className="fa fa-info-circle" aria-hidden="true"></i> More Info
                      </h6>
                      <h6 style={{ color: 'gray', fontWeight: 400, fontSize: 15 }}>{VERSION}</h6>
                    </div>
                    <div className="col text-end">
                      <a href={NAVIGATE_TO_APOD}>
                        <button
                          className="btn rounded-circle shadow-lg"
                          style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '60px'
                          }}
                        >
                          <i className="fa fa-arrow-right" style={{ fontSize: '25px' }}></i>
                        </button>
                      </a>
                    </div>
                  </CardFooter>
                </Card>
              )}
              {/* Render EMRI card if accessed */}
              {cardVisibility.emri && (
                <Card
                  key="emri"
                  maxW='sm'
                  borderRadius='20px'
                  boxShadow='0 0 0 1px #c7c7c7'
                  _hover={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}
                >
                  <CardBody>
                    <Image
                      src={EMRI_CARD_IMAGE}
                      alt=''
                      borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                      <div className="card-body d-flex align-items-center">
                        <img src={NASA_LOGO} className="card-logo-top img-with-border" alt="..." />
                        <h6 style={{ color: 'gray', fontWeight: 400, fontSize: 15, marginLeft: '10px' }}>NASA Open API's</h6>
                      </div>
                      <Heading size='md'>Explore Mars with Rover Images</Heading>
                      <Text noOfLines={3} overflow="hidden" textOverflow="ellipsis">
                        {EMRI_DESCRIPTION}
                      </Text>
                    </Stack>
                  </CardBody>
                  <CardFooter>
                    <div className="col text-start">
                      <h6 style={{ color: '#0056d2', fontWeight: 400, fontSize: 15 }}>
                        <i className="fa fa-info-circle" aria-hidden="true"></i> More Info
                      </h6>
                      <h6 style={{ color: 'gray', fontWeight: 400, fontSize: 15 }}>{VERSION}</h6>
                    </div>
                    <div className="col text-end">
                      <a href={NAVIGATE_TO_EMRI}>
                        <button
                          className="btn rounded-circle shadow-lg"
                          style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '60px'
                          }}
                        >
                          <i className="fa fa-arrow-right" style={{ fontSize: '25px' }}></i>
                        </button>
                      </a>
                    </div>
                  </CardFooter>
                </Card>
              )}
              {/* Render TES card if accessed */}
              {cardVisibility.tes && (
                <Card
                  key="tes"
                  maxW='sm'
                  borderRadius='20px'
                  boxShadow='0 0 0 1px #c7c7c7'
                  _hover={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}
                >
                  <CardBody>
                    <Image
                      src={TES_CARD_IMAGE}
                      alt=''
                      borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                      <div className="card-body d-flex align-items-center">
                        <img src={NASA_LOGO} className="card-logo-top img-with-border" alt="..." />
                        <h6 style={{ color: 'gray', fontWeight: 400, fontSize: 15, marginLeft: '10px' }}>NASA Open API's</h6>
                      </div>
                      <Heading size='md'>Track Earth from Space with Satellite Imagery</Heading>
                      <Text noOfLines={3} overflow="hidden" textOverflow="ellipsis">
                        {TES_DESCRIPTION}
                      </Text>
                    </Stack>
                  </CardBody>
                  <CardFooter>
                    <div className="col text-start">
                      <h6 style={{ color: '#0056d2', fontWeight: 400, fontSize: 15 }}>
                        <i className="fa fa-info-circle" aria-hidden="true"></i> More Info
                      </h6>
                      <h6 style={{ color: 'gray', fontWeight: 400, fontSize: 15 }}>{VERSION}</h6>
                    </div>
                    <div className="col text-end">
                      <a href={NAVIGATE_TO_TES}>
                        <button
                          className="btn rounded-circle shadow-lg"
                          style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '60px'
                          }}
                        >
                          <i className="fa fa-arrow-right" style={{ fontSize: '25px' }}></i>
                        </button>
                      </a>
                    </div>
                  </CardFooter>
                </Card>
              )}
            </SimpleGrid>
          </div>
        </div>
      </div>
    </div>
  );
};
