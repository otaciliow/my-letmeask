import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
// Link substitui a tag <a>

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import {Button} from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

export function NewRoom() {

    const { user } = useAuth();
    const [ newRoom, setNewRoom ] = useState('');
    const navigate = useNavigate();

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            return;
        }

        // roomRef é uma referência para o banco de dados do firebase
        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,

        });

        navigate(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração que simboliza perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p className="main-paragraph">Tire as dúvidas da sua audiência, em tempo real!</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />                    
                    <h2>Criar uma nova sala</h2>
                </div>                
                <form onSubmit={handleCreateRoom}>
                    <input type="text" value={newRoom} placeholder="Digite o código da sala" onChange={event => setNewRoom(event.target.value)}/>
                    <Button type="submit">Entrar na sala</Button>
                </form>
                <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
            </main>
        </div>
    );
}