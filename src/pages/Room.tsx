import { useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';

import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';

import '../styles/room.scss';
import { database } from '../services/firebase';

type FirebaseQuestions = Record<string, {
    author: {
        name:string;
        avatar:string;
    }
    content: string;
    isAnswered:boolean;
    isHighlighted:boolean;
}> // dessa forma, declaramos uma tipagem de objeto (Record) e o seu conteúdo entre os <>

type Question = {
    id: string;
    author: {
        name:string;
        avatar:string;
    }
    content: string;
    isAnswered:boolean;
    isHighlighted:boolean;
}

type RoomParams = {
    id:string;
}

export function Room() {

    const { user } = useAuth();

    const params = useParams<RoomParams>();
    const [ newQuestion, setNewQuestion ] = useState('');
    const [ questions, setQuestions ] = useState<Question[]>([]);
    const [ title, setTitle ] = useState('');

    const roomId = params.id;

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        // para acompanhar o valor do elemento apenas uma vez, usamos "once". para fazê-lo mais de uma vez, usamos "on"
        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions  ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content:value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered
                }
            })
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })
    }, [roomId]);

    async function handleSendQuestion(event: FormEvent) {

        event.preventDefault();

        if (newQuestion.trim() === '') {
            return;
        }

        if (!user) {
            throw new Error ('You need to be logged in to send questions!')
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,                
            },
            isHighlighted: false, // se a pergunta está destacada (sendo respondida no momento)
            isAnswered: false // se a pergunta foi respondida
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Logo letmeask"/>
                    <RoomCode code={roomId} />
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                <form onSubmit={handleSendQuestion}>
                    <textarea placeholder="O que você quer perguntar?" onChange={event => setNewQuestion(event.target.value)} value={newQuestion} />
                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta,&nbsp;<Button className="button-room">faça seu login</Button>.</span>
                        )}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>

                {JSON.stringify(questions)}
            </main>
        </div>
    );
}