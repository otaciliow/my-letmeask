Olá! Esse é o letmeask, um projeto desenvolvido juntamente com a Rocketseat no evento NLW Together.

O projeto é uma plataforma de perguntas e respostas, onde um usuário pode criar uma sala utilizando seu e-mail do google, escolher um nome para essa sala e compartilhar um código que é gerado automaticamente com outras pessoas para que elas possam entrar nessa sala e enviar perguntas. O admin da sala pode destacar mensagens, marcar como respondida, apagar mensagens enviadas pelos outros participantes da sala ou até mesmo encerrar a sala.

Para a construção do projeto, foram utilizados:

- ReactJS: utilizamos conceitos como hooks, contexts, componentização, spread operators e navegação em rotas para elaborar a estrutura HTML das páginas e a programação de cada uma delas.

- TypeScript: utilizamos TS para otimizar o javascript das páginas e a utilização das variavéis e suas respectivas tipagens, garantindo seu perfeito funcionamento.

- SASS: utilizamos diversas ferramentas que o SASS nos possibilita para estilizar as páginas.

- Firebase: utilizamos autenticação para que o usuário possa usar o seu e-mail do google para criar as salas, e o realtime database para hospedar essas salas e todas as informações referentes a elas (ID, titulo da sala, perguntas, quantidade de likes, remoção e alteração de estado das perguntas (respondidas ou destacadas) e encerramento do acesso à sala). O firebase também foi utilizado para fazer o deploy da aplicação na web, através da URL: https://myletmeask-2e134.web.app/

- Yarn: utilizamos o Yarn para adicionar os webpacks e para rodar a aplicação em ambiente de desenvolvimento.
