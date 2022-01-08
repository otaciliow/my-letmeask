// importa todas as tipagens possíveis para um button (para cada atributo)
import {ButtonHTMLAttributes} from 'react';

import '../styles/buttons.scss';

// declara que ButtonProps receberá uma lista com todos os atributos importados anteriormente
// podemos adicionar outras tipagems que o elemento pode receber, usando &
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean;
};

// o que não for outlined, será incluído como props
export function Button({isOutlined = false, ...props}: ButtonProps) {
    return(
        <button className={`button ${isOutlined ? 'outlined' : ''}`} {...props} />
    );
}

// {...props} permite inserir diversas propriedades como parâmetros