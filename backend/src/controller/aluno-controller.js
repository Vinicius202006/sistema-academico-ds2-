// Importa o model repsonsável pelos dados
// e regras relacionadas aos alunos

import AlunoModel from "../model/aluno-model.js";

// Importa as funções utilizadas para trabalhar
// com as requisições e respostas HTTP.

import {
    enviarJson,
    lerCorpoJson
} from "../util/http.js";

// Cria o aluno controller do backend
const AlunoController = {

// Lista todos os alunos cadastrados,
// esta função será executada quando o servidor 
// receber GET /api/alunos.
listar(req, res) {
    
    // Solicita os dados ao model
    const alunos = AlunoModel.listar();

    // Envia uma mensagem com status 200

    // Status 200 significa que a requisição
    // foi processada com sucesso
    enviarJson(res, 200, {
        total: alunos.length,
        dados: alunos
    });
},
// Cadastra um novo aluno

// Async indica que a função possui uma operação assincrona
async cadastrar(req, res) {
    try {
        // Aguarda a leitura e conversão do JSON
        // recebido na requisição
        const dados = await lerCorpoJson(req);

        // Encaminha os dados para o model.
        const resultado = AlunoModel.cadastrar(dados);

        // Verifica se o model encontrou algum 
        // problema de validação
        if (!resultado.sucesso) {
            enviarJson(res, resultado.status, {
                sucesso: false,
                mensagem: resultado.mensagem
            });
            return;
        }
        // Se o cadastro foi realizado responde 
        // com status 201.
        enviarJson(res, resultado.status, {
            sucesso: true,
            mensagem: "Aluno cadastrado com sucesso.",
            dados: resultado.aluno
        });
    } catch(erro) {
        // Este bloco será executado, por exemplo,
        // quando o cliente enviar um JSON invalido.
        enviarJson(res,400, {
            sucesso: false,
            mensagem: "O corpo da requisição contém um JSON inválido"
        });
    }
}
};

// Exporta o controller para que ele seja
// utilizado pelo arquivo de rotas
export default AlunoController;