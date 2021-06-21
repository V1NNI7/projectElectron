import React, { useCallback, useEffect, useState } from 'react';
import { Button } from './styles';
import api from '../../../services/api';
import MoviesDev from '../../../components/MoviesDev';
import Modal from '../../../components/ModalDev';
import GlobalMenuDev from '../../../components/GlobalMenuDev';

const DevMovies = () => {

    const [movie, setMovie] = useState([]);
    const [filter, setFilter] = useState([]);
    const [search, setSearch] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState();

    const loadingMovies = useCallback(async () => {
        try {
            const response = await api.get('/filmes');
            if (response.data) {
                setMovie(response.data);
                setFilter(response.data);
            }
        } catch (error) {
            console.log('Ocorreu uma falha na comunicação com a API')
        }
    }, []);

    useEffect(() => {
        loadingMovies();
    }, [loadingMovies]);

    const handleSearch = useCallback(() => {
        if (search === '') {
            setFilter(movie);
        } else {
            const result = movie.filter(m => m.nome.toUpperCase().includes(search.toUpperCase()));
            setFilter(result);
        }
    }, [search]);

    useEffect(() => {
        handleSearch();
    }, [handleSearch]);

    const remove = async (id) => {
        let response;
        response = await api.delete(`/filmes/${id}`);

    }

    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                height: "100vh",
            }}>
                <GlobalMenuDev />
                <div>
                    <form>
                        <input
                            type="text"
                            id="search"
                            name="search"
                            onChange={e => setSearch(e.target.value)}
                        />
                    </form>
                        <h1>Filmes</h1>
                    {filter.map(m => {
                        return (
                            <div key={m.id}>
                                <MoviesDev movie={m} />
                                <Button onClick={() => { setSelectedMovie(m); setModalVisible(true); }}>Editar</Button>
                                <Button onClick={() => remove(m.id)} >Deletar</Button>
                            </div>
                        );
                    })}
                </div>
            </div>
            {modalVisible ? <Modal onClose={() => setModalVisible(false)} selectedMovie={selectedMovie} /> : null}
        </>
    )
}
export default DevMovies;