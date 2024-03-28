import React from 'react';
import { Modal } from 'react-bootstrap';
import { parseDate } from '../../../utils/functions';
import Loader from '../../Loader/Loader';

const CharacterModal = ({ isOpen, onClose, character, homeworld, isLoading }) => {
    if (!isOpen) return null;
    const { height, mass, birth_year, films, created, characterFilms, name, climate, residents, terrain } = character

    return (
        <>
            <Modal centered show={isOpen} onHide={onClose}>
                <Modal.Header className="bg-dark text-white" >
                    <Modal.Title className="ms-auto">{character.name}</Modal.Title>
                    <button type="button" className="btn-close" style={{ backgroundColor: 'white' }} onClick={onClose}></button>
                </Modal.Header>

                <Modal.Body className='position-relative'>
                    {isLoading &&
                        <Loader />}

                    <div className="mb-4">
                        <div className='text-center mb-3'>
                            <h5 className="fw-bold">Profile</h5>
                        </div>
                        <div className="border px-3">
                            <div className="row py-3">
                                <div className="col"><span className='fw-bold'>Height:</span> {height} cm</div>
                                <div className="col"><span className='fw-bold'>Mass:</span> {mass} kg</div>
                            </div>
                            <div className="row py-3">
                                <div className="col"><span className='fw-bold'>Birth Year:</span> {birth_year}</div>
                                <div className="col"><span className='fw-bold'>Number of Films:</span> {characterFilms ?? films?.length}</div>
                            </div>
                            <div className="row py-3">
                                <div className="col-12"><span className='fw-bold'>Date Added to Api:</span> {parseDate(created)}</div>
                            </div>
                        </div>
                    </div>
                    <div className='pb-4'>
                        <div className='text-center mb-3'>
                            <h5 className='fw-bold'>Homeworld info</h5>
                        </div>
                        <div className="border px-3">
                            <div className="row py-3">
                                <div className="col"><span className='fw-bold'>Name:</span> {name ?? homeworld?.name} </div>
                                <div className="col"><span className='fw-bold'>Climate:</span> {climate ?? homeworld?.climate} </div>
                            </div>
                            <div className="row py-3">
                                <div className="col-12"><span className='fw-bold'>Number of Residents:</span> {residents ?? homeworld?.residents?.length}</div>
                            </div>
                            <div className="row py-3">
                                <div className="col-12"><span className='fw-bold'>Terrain:</span> {terrain ?? homeworld?.terrain}</div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CharacterModal;
