import React, { useState, useEffect, useContext } from 'react'
import { Spinner, Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '../components/Card/Card'
import Header from '../components/Layout/Header/Header'
import CharacterModal from '../components/Modal/CharacterModal/CharacterModal'
import { deleteRequest, getRequest, postRequest, putRequest } from '../utils/api'
import { AppContext } from '../App'
import { notifyError, notifySuccess } from '../utils/functions'
import CharacterDetailsModal from '../components/Modal/CharacterDetailsModal/CharacterDetailsModal';
import './style.css'

const LandingPage = () => {
    const { appData, setAppData } = useContext(AppContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalLoader, setModalLoader] = useState(false);
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState({});
    const [homeWorld, setHomeWorld] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        fetchCharactersData();
    }, []);

    //Fetch starwars data
    const fetchCharactersData = async (page = 1) => {
        setPage(page)
        setIsLoading(true)
        try {
            const response = await getRequest(`http://localhost:3000/api/starWars/people?page=${page}`);
            setIsLoading(false);
            setData(response?.data);
            setAppData({ ...appData, pages: { ...appData?.pages, [page]: response?.data } })
        } catch (error) {
            notifyError(error, "top-left")
            setIsLoading(false);
        }
    }

    //If data exist in context api hook then manage from it and if not then call star wars api
    const getPaginationData = async (page = 1) => {
        if (appData?.pages && appData?.pages[page]) {
            setData(appData?.pages[page])
            return
        }
        fetchCharactersData(page)
    }

    //Get character homeworld info data
    const getHomeWorldData = async (url) => {
        if (appData?.homeworld && appData?.homeworld[url]) {
            setHomeWorld(appData?.homeworld[url])
            return
        }
        setModalLoader(true)
        try {
            const response = await getRequest(url)
            setHomeWorld(response?.data)
            setAppData({ ...appData, homeworld: { ...appData?.homeworld, [url]: response?.data } })
            setModalLoader(false);
        } catch (error) {
            notifyError(error, "top-left")
            setModalLoader(false);
        }
    }

    const handleNextPage = () => {
        setPage(page + 1);
        getPaginationData(page + 1)
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
            getPaginationData(page - 1)
        }
    }

    //Open Character Modal
    const openCharacterModal = (id, character) => {
        setSelectedCharacter(character)
        getHomeWorldData(character?.homeworld)
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCharacter({})
        setHomeWorld([])
        setIsModalOpen(false);
        setAddModalOpen(false);
    };

    //It deletes character from frontent in context api hook and call delete api to delete character from backend
    const onCardDelete = async (id, element) => {
        try {
            await deleteRequest(`http://localhost:3000/api/starWars/people/${id}`);
            const filterData = appData?.pages[page]?.filter((item) => item?._id !== id)
            const updatedData = {
                ...appData,
                pages: { ...appData.pages, [page]: filterData }
            }
            setAppData(updatedData);
            setData(updatedData?.pages[page])
            notifySuccess("Character deleted Successfully");
        } catch (error) {
            console.error('API request failed:', error);
            notifyError("Failed to delete character. Please try again later.");
        }
    }

    const onCardEdit = (id, character) => {
        setSelectedCharacter(character)
        character?.homeworld && getHomeWorldData(character?.homeworld)
        setAddModalOpen(true)
    }

    const openAddModal = () => {
        setAddModalOpen(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedCharacter({ ...selectedCharacter, [name]: value });
    };

    //Handle Character Details input 
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return
        }
        try {
            //Edit and Update Character Details
            if (selectedCharacter?._id) {
                await putRequest(`http://localhost:3000/api/starWars/people/${selectedCharacter?._id}`, { ...selectedCharacter })
                let updatedData = {
                    ...appData,
                    pages: {
                        ...appData.pages, [page]: appData.pages[page]?.map(s => {
                            if (s._id === selectedCharacter?._id) {
                                return {
                                    ...s, ...selectedCharacter
                                }
                            }
                            return s
                        })
                    }
                }
                setAppData(updatedData);
                setData(updatedData?.pages[page])
                notifySuccess("Character updated Successfully");
            }
            //Add New Character 
            else {
                await postRequest(`http://localhost:3000/api/starWars/people`, { ...selectedCharacter })
                fetchCharactersData()
                notifySuccess("Character added Successfully");
            }
            setValidated(false);
            closeModal()
        } catch (err) {
            console.error('API request failed:', err);
            notifyError("Failed to update character. Please try again later.");
        }
    };

    return (
        <>
            <div>
                <Header />
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    closeOnClick
                    rtl={false}
                    draggable
                />
                {isLoading ?
                    <div className="Container pagination">
                        <Spinner animation="border" variant="primary" />
                    </div>
                    :
                    <>
                        <div className="Container pagination">
                            <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
                            <span>Page {page}</span>
                            <button onClick={handleNextPage}>Next</button>
                            <div>
                                <Button onClick={openAddModal} variant="primary">Add</Button>
                            </div>
                        </div>
                        <div className="Container">
                            {data?.length > 0 ? data?.map((element, index) => {
                                const { _id, name, skin_color, image } = element
                                return (
                                    <div key={index}>
                                        <div key={index} onClick={() => openCharacterModal(index, element)} >
                                            <Card key={index} name={name} skinColor={skin_color} image={image} />
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "center", gap: '20px', marginTop: '15px' }}>
                                            <Button onClick={() => onCardDelete(_id, element)} style={{ marginBottom: "10px" }} variant="danger">Delete</Button>
                                            <Button onClick={() => onCardEdit(_id, element)} style={{ marginBottom: "10px" }} variant="primary">Edit</Button>
                                        </div>
                                    </div>
                                )
                            }) : "No Data Found"}
                        </div>
                    </>
                }
                <CharacterDetailsModal isLoading={modalLoader} homeworld={homeWorld} isOpen={addModalOpen} onClose={closeModal}
                    handleSubmit={handleSubmit} handleChange={handleChange} character={selectedCharacter} validated={validated}
                />
                <CharacterModal isLoading={modalLoader} isOpen={isModalOpen} onClose={closeModal}
                    character={selectedCharacter} homeworld={homeWorld} />
            </div>
        </>
    )
}

export default LandingPage