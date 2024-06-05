# Auto Tech House

Seja Bem Vindo à Auto Tech House. Este é um projeto que permite ao usuário controlar remotamente a sua casa. Na versão física do projeto(em miniatura) estão instaladas diversos sensores. Esses sensores são monitorados por arduinos e EPS32, sendo que o ESP32 é capaz de conectar com internet através do wifi.
Logo, a auto-tech-house-api fornece ao usuário um interface gráfica em html e css que o possibilita receber informações de sua casa, assim como controlá-la remotamente (desativando e ativando
sensores remotamente).

# Visão Geral

Este projeto foi construído em utilizando as seguintes tecnologias:

- ### Protocolos de comunicação:
  1. HTTP: Autenticação e crud de usuário
  2. WebSocket: Comunicação Cliente <--> Api <--> Casa
- ### Interface:
  1. Html e Css: estrutura e estilização.
  2. JavaScript: Comunicação e interatividade.
     
![image](https://github.com/Equipe-STR/auto-tech-house-api/assets/115730575/8d021d47-5e4c-47a2-b32f-c4e351834fb3)

- ### API:
  1. Node JS: Usado Para roda JavaScript no servidor.
  2. TypeScrit com express e ws: linguagem e bibliotecas utilizadas.

- ### Projeto físico:
  1. Arduino e Esp32: Usados Para controlar e monitorar o sistemas
  2. Sensores: presença, luminosidade, incência e de monitoramento de potência.
  3. protoboard, jumpers e leds.
  4. maquete física.
     
  ![12fb79b9-b86c-492f-a58f-4bf897e680c4](https://github.com/Equipe-STR/auto-tech-house-api/assets/115730575/d4b2f235-2c06-4d0a-9404-e01eaaa5ac47)

     


## Requisitos
Para rodar esse projeto na sua máquina é necessário ter o Node Js instalado na sua maquina. A versão utilizada foi a 20.11.1.

## Endpoints
Esses são todos os endpoints do sistema:
/ Requisição http do tipo get ->Retorna a interface.
/users Requisição http do tipo get,post,put e delete(privada) -> Crud de usários.
/auth Requisição http do tipo get -> Login.
/sensorsReading Requisição http do tipo get,post e delete(privada) -> Acesso a tabela de leitura de sensores.
/ Requisição web socket -> conexão client <--> servidor em tempo real.


## Equipe responsável 

ISRAEL SILVA <br>
GABRIEL ARAÚJO <br>
INÁCIO LIMA <br>
FRANCISCO SILVAN FELIPE <br>
JOÃO ARTUR SALES


## Guia de Uso

Quer usar? Ok, então basta seguir estas etapas simples:

```bash
# Clone o repositório
https://github.com/Equipe-STR/auto-tech-house-api.git

# Abra a pasta no Visual Studio Code
cd seu-repositorio

# Instale as Dependências
npm install ou yarn

# Crie o banco de dados
npm run prisma generate ou yarn prisma generate

# Execute o Aplicativo no Servidor
npm run dev ou yarn dev
