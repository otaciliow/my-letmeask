import copyImg from '../assets/images/copy.svg';

import "../styles/roomCode.scss";

type RoomCodeProps = {
    code:string | undefined;
}

export function RoomCode(props: RoomCodeProps) {    

    return(
        <button className="room-code">     
            <div>
                <img src={copyImg} alt="Copiar código da sala" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}