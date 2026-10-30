# Sistema Acadêmico DS II 

Projeto integrador da disciplina Desenvolvimento para Servidores II. 

## Criado por

Nome: Vinicius de Lima Morais\
RA: 2650832423025\
Turma: 5º Semestre - Sistemas para Internet

## Instruções para executar o backend
### É necessária a instalação do node.js para o funcionamento do backend
1. Ao acessar o diretório do projeto
2. Abrir o terminal e digitar `cd backend` para acessar o backend.
3. Rodar o comando `npm install` para instalar as dependências do projeto
4. Rodar o comando `npm run dev` para inicializar o servidor.

## Instruções para executar o frontend
### É necessária a instalação da extensão Live Server para o funcionamento do frontend
1. Acessar o diretório sistema-academico-ds2/frontend/js/`index.html`
2. Localizar o index.html
3. Clicar com o botão direito em cima do arquivo index.html
4. Selecionar a opção **open with live server**\
**Reitero, se você não tiver, a necessidade da instalação da extensão Live Server**

## Relação dos endpoints disponíveis

A API do Sistema Acadêmico DS II disponibiliza os seguintes endpoints:

| Método HTTP | Endpoint | Descrição |
|---|---|---|
| GET | `/api/health` | Verifica se o servidor está funcionando. |
| GET | `/api/alunos` | Retorna a lista de alunos cadastrados. |
| POST | `/api/alunos` | Cadastra um novo aluno. |

### URL base

```text
http://localhost:3000
```

### Exemplos de utilização

- **Listar alunos:** `GET http://localhost:3000/api/alunos`
- **Cadastrar aluno:** `POST http://localhost:3000/api/alunos`
- **Verificar servidor:** `GET http://localhost:3000/api/health`

## Evidências 
As principais evidências do projeto estão salvas em imagens na pasta sistema-academico-ds2/docs com o resumo da evidência no título.

## Objetivo do projeto

Desenvolver gradualmente uma aplicação web para cadastro de alunos,
disciplinas, usuários e lançamento de notas. 

## Tecnologias utilizadas 
- HTML 
- CSS 
- JavaScript 
- Node.js 
- Express 
- MySQL 
- JWT 
- Git e GitHub 

## Estrutura 

- frontend: interface da aplicação 
- backend: API e regras do servidor 
- database: scripts do banco de dados 
- docs: documentação e evidências 


