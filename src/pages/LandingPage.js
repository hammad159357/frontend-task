import React, { useState, useEffect, useContext } from 'react'
import { Spinner, Button } from 'react-bootstrap';
import Card from '../components/Card/Card'
import Header from '../components/Layout/Header/Header'
import CharacterModal from '../components/Modal/CharacterModal/CharacterModal'
import { deleteRequest, getRequest } from '../utils/api'
import { AppContext } from '../App'
import { notifyError, notifySuccess } from '../utils/functions'
import './style.css'

const LandingPage = () => {
    const { appData, setAppData } = useContext(AppContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalLoader, setModalLoader] = useState(false);
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [homeWorld, setHomeWorld] = useState([]);


    useEffect(() => {
        getData();
    }, []);

    const getData = async (page = 1) => {
        if (appData?.pages && appData?.pages[page]) {
            setData(appData?.pages[page])
            return
        }
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
        getData(page + 1)
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
            getData(page - 1)
        }
    }

    const openCharacterModal = (id,character) => {
        setSelectedCharacter(character)
        getHomeWorldData(character?.homeworld)
        setIsModalOpen(true);
    };
   

    const closeModal = () => {
        setSelectedCharacter(null)
        setIsModalOpen(false);
    };

    const onCardDelete = (id, element) => {
        const filterData = appData?.pages[page]?.filter((item, index) => id !== index)
        appData.pages[page] = filterData
        setData(appData?.pages[page])
        deleteRequest(`http://localhost:3000/api/starWars/people/delete`, { id })
    }

    return (
        <>
            <Header />
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
                    </div>
                    <div className="Container">


                        {data?.map((element, index) => {
                            const { name, skin_color, image } = element
                            return (
                                <div key={index}>
                                    <Button onClick={() => onCardDelete(index, element)} style={{ marginBottom: "10px" }} variant="danger">Delete</Button>{' '}
                                    <div key={index} onClick={() => openCharacterModal(index,element)} >
                                        <Card key={index} name={name} skinColor={skin_color} image={image} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
            }
            <CharacterModal isLoading={modalLoader} isOpen={isModalOpen} onClose={closeModal} character={selectedCharacter} homeworld={homeWorld} />
        </>
    )
}

export default LandingPage