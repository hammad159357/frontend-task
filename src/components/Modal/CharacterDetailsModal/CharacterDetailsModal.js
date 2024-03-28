import React from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'; // Import necessary components
import { parseDate } from '../../../utils/functions';
import Loader from '../../Loader/Loader';

const CharacterDetailsModal = ({ isOpen, onClose, character, handleChange, validated, handleSubmit, homeworld, isLoading }) => {
  if (!isOpen) return null;
  const { name, skin_color, height, mass, birth_year, created, climate, terrain, residents, films, characterFilms } = character


  return (
    <Modal centered show={isOpen} onHide={onClose}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Character Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading &&
            <Loader />
          }
          <Row>
            <Col className='text-center'>
              <h5 class>Profile</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formFieldName">
                <Form.Label>Name:</Form.Label>
                <Form.Control required name='name' type="text" placeholder='Enter name' value={name} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formFieldEmail">
                <Form.Label>Skin Color:</Form.Label>
                <Form.Control required name='skin_color' type="text" placeholder='Enter skin color' value={skin_color} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formFieldHeight">
                <Form.Label>Height:</Form.Label>
                <Form.Control required name='height' type="number" placeholder='Enter height in cm' value={height} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formFieldMass">
                <Form.Label>Mass:</Form.Label>
                <Form.Control required name='mass' type="number" placeholder='Enter mass in kg' value={mass} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formFieldBirthYear">
                <Form.Label>Birth Year:</Form.Label>
                <Form.Control required name='birth_year' type="text" placeholder='Enter birth year' value={birth_year} onChange={handleChange} />
              </Form.Group>

            </Col>
            <Col>
              <Form.Group controlId="formFieldFilms">
                <Form.Label>Number Of Films:</Form.Label>
                <Form.Control required disabled={films?.length} name='characterFilms' type="number" placeHolder='Enter number of Films' value={characterFilms ?? films?.length} onChange={handleChange} />
              </Form.Group>

            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formFieldBirthYear">
                <Form.Label>Date:</Form.Label>
                <Form.Control required name='created' type="date" value={created && parseDate(created)} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col className='text-center mt-3'>
              <h5 class>Home World Information</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formFieldClimate">
                <Form.Label>Climate:</Form.Label>
                <Form.Control required disabled={homeworld?.climate} name='climate' placeholder='Enter climate' type="text" value={climate ?? homeworld?.climate} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formFieldResidents">
                <Form.Label>Number of Residents:</Form.Label>
                <Form.Control required disabled={homeworld?.residents} name='residents' placeholder='Enter number of residents' value={residents ?? homeworld?.residents?.length} type="number" onChange={handleChange} />
              </Form.Group>

            </Col>
            <Col>
              <Form.Group controlId="formFieldTerrain">
                <Form.Label>Terrain:</Form.Label>
                <Form.Control disabled={homeworld?.terrain} required name='terrain' placeholder='Enter terrain' type="text" value={terrain ?? homeworld?.terrain} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default CharacterDetailsModal