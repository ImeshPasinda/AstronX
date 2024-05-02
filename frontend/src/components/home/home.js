import React from 'react';
import { Button, SimpleGrid, Card, CardBody, CardFooter, Image, Stack, Heading, Text } from '@chakra-ui/react'
import { APOD_CARD_IMAGE, EMRI_CARD_IMAGE, MARS_IMAGE, NASA_LOGO, TES_CARD_IMAGE } from '../../constant/imageConstant';
import { NAVIGATE_TO_APOD, NAVIGATE_TO_EMRI, NAVIGATE_TO_TES } from '../../constant/routeConstant';
import { APOD_DESCRIPTION, EMRI_DESCRIPTION, TES_DESCRIPTION, VERSION } from '../../constant/commonConstant';

export default function Home() {

  return (
    <div style={{ marginBottom: '10%' }}>
      <div>
        <div className='home-container'>
          <div className='content'>
            <div className='text'>
              <h1 style={{ fontSize: '75px', fontWeight: 'bold' }}>NASA Explorer Hub</h1>
              <p>Unveiling the Wonders of the Universe</p>
              <div className="buttons">
                <Button bg='#0056d2' color='white' variant='solid' borderRadius='4px' size='lg' style={{ marginRight: '10px', marginTop: '10px' }}>
                  Explore Mars
                </Button>
                <Button bg='white' color='#0056d2' borderColor='#0056d2' variant='outline' borderRadius='4px' size='lg' style={{ marginRight: '10px', marginTop: '10px' }}>
                  Discover Space
                </Button>
              </div>
            </div>
            <div className='image'>
              <img src={MARS_IMAGE} alt='...' width='500' />
            </div>
          </div>
        </div>
        <div className='card-container' >
          <SimpleGrid
            columns="repeat(auto-fill, minmax(250px, 1fr))"
            spacing={8}
            templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          >
            <Card
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
                  <Text noOfLines={3} overflow="hidden" textOverflow="ellipsis" style={{ color: 'gray' }}>
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
            <Card
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
                  <Text noOfLines={3} overflow="hidden" textOverflow="ellipsis" style={{ color: 'gray' }}>
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
            <Card
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
                  <Text noOfLines={3} overflow="hidden" textOverflow="ellipsis" style={{ color: 'gray' }}>
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

          </SimpleGrid>

          <div className="buttons" style={{ paddingTop: '30px' }}>
            <Button bg='#0056d2' color='white' variant='solid' borderRadius='4px' size='lg' style={{ marginRight: '10px', marginTop: '10px' }}>
              Show 0 more
            </Button>
            <Button bg='white' color='#0056d2' borderColor='#0056d2' variant='outline' borderRadius='4px' size='lg' style={{ marginRight: '10px', marginTop: '10px' }}>
              View all<i className="fa fa-arrow-right" style={{ fontSize: '20px', paddingLeft: '10px' }}></i>
            </Button>
          </div>
        </div>


      </div>
    </div>

  );
}
