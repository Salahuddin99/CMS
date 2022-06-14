import React from 'react'
import { Carousel } from 'react-bootstrap'

function HomeScreen() {
  return (
    <>
      <h1>Home</h1>
      <Carousel fade variant="dark">
        <Carousel.Item>
          <img
            className="d-block"
            style={{ height: 500, width: 1300 }}
            src="https://insidearabia.com/wp-content/uploads/2020/05/IMG_2393-1280x640.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Donate now</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            style={{ height: 500, width: 1300 }}
            src="https://www.moonstone.co.za/upmedia/uploads/charity.png"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Donate now</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            style={{ height: 500, width: 1300 }}
            src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_494415321_109575.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Donate now</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  )
}

export default HomeScreen
