// importa todas as tipagens possíveis para um button (para cada atributo)
import {ButtonHTMLAttributes} from 'react';

import '../styles/buttons.scss';

// declara que ButtonProps receberá uma lista com todos os atributos importados anteriormente
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
    return(
        <button className="button" {...props} />
    );
}

// {...props} permite inserir diversas propriedades como parâmetros