import React, { useEffect, useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { ImgProfile, Button, Title, BackToHome } from './styles';

const Perfil = () => {
    const history = useHistory();

    const [storage, setStorage] = useState({});

    const getStorage = useCallback(async () => {
        try {
            const storage = await localStorage.getItem('img')
            setStorage(JSON.parse(storage))
        } catch (error) {
            console.log(error)
        }
    }, []);

    const ProfileImages = [
        {
            id: 1,
            link: "https://i.imgur.com/2ezz7tz.png"
        },
        {
            id: 2,
            link: "https://sguru.org/wp-content/uploads/2017/06/steam-avatar-profile-picture-1003.jpg"
        },
        {
            id: 3,
            link: "https://sguru.org/wp-content/uploads/2017/06/steam-avatar-profile-picture-1773.jpg"
        },
        {
            id: 4,
            link: "https://i.pinimg.com/originals/6f/06/52/6f0652369f39ec5aab17fc1e29377c6a.png"
        },
    ];

    useEffect(() => {
        getStorage();
    }, [getStorage])

    return (
        <>
            <Title>Escolha seu perfil</Title>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                }}>
            {ProfileImages.map(p => {
                return (
                    <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', marginRight: '30px'}} key={p.id}>
                        <ImgProfile src={p.link} />
                        <Button onClick={
                            () => {
                                localStorage.setItem('img', JSON.stringify(p.link))
                                history.push("/home")
                            }
                        }>Selecione essa imagem</Button>
                    </div>
                );
            })}
            </div>
            <BackToHome><Link to="/home">Voltar a home</Link></BackToHome>
        </>
    )
};

export default Perfil;