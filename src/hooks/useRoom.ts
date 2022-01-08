import { useEffect, useState } from "react";
import { database } from "../services/firebase";

import { useAuth } from '../hooks/useAuth';

type FirebaseQuestions = Record<string, {
    author: {
        name:string;
        avatar:string;
    }
    content: string;
    isAnswered:boolean;
    isHighlighted:boolean;
    likes: Record<string, {authorId: string}>;
}> // dessa forma, declaramos uma tipagem de objeto (Record) e o seu conteúdo entre os <>

type QuestionType = {
    id: string;
    author: {
        name:string;
        avatar:string;
    }
    content: string;
    isAnswered:boolean;
    isHighlighted:boolean;
    likeCount: number;
    likeId: string | undefined;
}

export function useRoom(roomId: string | undefined) {
    const { user } = useAuth();
    const [ questions, setQuestions ] = useState<QuestionType[]>([]);
    const [ title, setTitle ] = useState('');

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
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, likes]) => likes.authorId === user?.id)?.[0],
                    // some() percorrer o array até encontrar uma opção que satisfaça a condição que foi definida, retornando true ou false
                }
            })
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })

        return () => {
            roomRef.off('value');
            // remove todos os eventListeners
        }
    }, [roomId, user?.id]);
    // é necessário passar a variável user aqui, porque o seu valor vem de fora do useEffect() que o está utilizando

    return {questions, title};
}