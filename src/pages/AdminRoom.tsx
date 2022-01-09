import { useNavigate, useParams } from 'react-router-dom';
//import { FormEvent, useState } from 'react';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
//import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss';
import { database } from '../services/firebase';
//import { database } from '../services/firebase';

type RoomParams = {
    id:string;
}

export function AdminRoom() {

    //const { user } = useAuth();

    const navigate = useNavigate();
    const params = useParams<RoomParams>();
    //const [ newQuestion, setNewQuestion ] = useState('');
    
    
    const roomId = params.id;    
    const { title, questions } = useRoom(roomId);

    async function handleEndRoom() {
        database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        navigate('/');
    }

    async function handleDeleteQuestion(questionId: string) {        
        if (window.confirm ('Tem certeza de que deseja excluir esta pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
            isHighlighted: false,
        });
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        });
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Logo letmeask"/>
                    <div className="buttons">
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>                

                <div className="question-list">
                {/* o map é uma propriedade do js que funciona da mesma forma que o "foreach" */}
                {/* ou seja: executa ações para cada item dentro de uma matriz ou vetor */}
                {questions.map(question => {
                    return (
                        <Question key={question.id} content={question.content} author={question.author} isAnswered={question.isAnswered} isHighlighted={question.isHighlighted}>
                                {/* se a pergunta não tiver sido respondida, os botões de highlight e read serão exibidos */}
                                {/* senão, eles serão escondidos */}
                                {!question.isAnswered && (
                                    <>
                                        <button type="button" onClick={ () => {handleCheckQuestionAsAnswered(question.id)} }>
                                            <img src={checkImg} alt="Marcar pergunta como respondida" />
                                        </button>
                                        <button type="button" onClick={ () => {handleHighlightQuestion(question.id)} }>
                                            <img src={answerImg} alt="Destacar pergunta" />
                                        </button>
                                    </>
                                )}
                                <button type="button" onClick={ () => {handleDeleteQuestion(question.id)} }>
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                        </Question>
                        // é necessário passar uma key para os elementos do map, para que o react saiba qual é cada opção
                    )
                })}
                </div>
            </main>
        </div>
    );
}