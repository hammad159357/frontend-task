import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { parseDate } from '../../../utils/functions';

const CharacterModal = ({ isOpen, onClose, character, homeworld, isLoading }) => {
    if (!isOpen) return null;
    const { height, mass, birth_year, films, created } = character
    const { name, climate, residents, terrain } = homeworld
    const date = parseDate(created)

    return (
        <>
            <Modal centered show={isOpen} onHide={onClose}>
                <Modal.Header className="bg-dark text-white" >
                    <Modal.Title className="ms-auto">{character.name}</Modal.Title>
                    <button type="button" className="btn-close" style={{ backgroundColor: 'white' }} onClick={onClose}></button>
                </Modal.Header>

                <Modal.Body className='position-relative'>
                    {isLoading &&
                        <div className="text-center position-absolute top-0 start-0" 
                        style={{
                            backgroundColor: "rgb(135 135 133 / 50%)",
                            height: "500px", width: "500px"
                        }}>
                            <div className='d-flex justify-content-center align-items-center' style={{ height: "500px", width: "500px" }}>
                                {<Spinner animation="border" variant="primary" />}
                            </div>
                        </div>}

                    <div className="mb-4">
                        <div className='text-center mb-3'>
                            <h5 className="fw-bold">Profile</h5>
                        </div>
                        <div className="border px-3">
                            <div className="row py-3">
                                <div className="col"><span  className='fw-bold'>Height:</span> {height} cm</div>
                                <div className="col"><span className='fw-bold'>Mass:</span> {mass} kg</div>
                            </div>
                            <div className="row py-3">
                                <div className="col"><span className='fw-bold'>Birth Year:</span> {birth_year}</div>
                                <div className="col"><span className='fw-bold'>Number of Films:</span> {films?.length}</div>
                            </div>
                            <div className="row py-3">
                                <div className="col-12"><span className='fw-bold'>Date Added to Api:</span> {date}</div>
                            </div>
                        </div>
                    </div>
                    <div className='pb-4'>
                        <div className='text-center mb-3'>
                            <h5 className='fw-bold'>Homeworld info</h5>
                        </div>
                        <div className="border px-3">
                            <div className="row py-3">
                                <div className="col"><span className='fw-bold'>Name:</span> {name} </div>
                                <div className="col"><span className='fw-bold'>Climate:</span> {climate} </div>
                            </div>
                            <div className="row py-3">
                                <div className="col-12"><span className='fw-bold'>Number of Residents:</span> {residents?.length}</div>
                            </div>
                            <div className="row py-3">
                                <div className="col-12"><span className='fw-bold'>Terrain:</span> {terrain}</div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CharacterModal;
