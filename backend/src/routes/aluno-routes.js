// Importa o controller de alunos
import AlunoController from "../controller/aluno-controller.js";

// Importar as funções responsáveis pelas repsostas
// HTTP.
import {
    enviarJson,
    enviarSemConteudo
} from "../util/http.js";

// Esta funcção analisa a requisição recebida
// e decide qual código deverá ser executado.
export async function tratarRotas(req, res) {
    
    // Cria um objeto URL a partir do endereço
    // recebido na requisição
    
    //req.url contém somente o caminho solicitado
    // exemplo: /api/alunos
    const url = new URL(
        req.url,
        `http://${req.headers.host || "localhost"}`
    );

    // pathname representa somente o caminho da URL.
    const caminho = url.pathname;
    
    // req,method informa o método HTTP utilizado.
    // exemplo:

    // GET
    // POST 
    // PUT
    // DELETE
    const metodo = req.method;

    // O navegador pode enviar uma requisição 
    // OPTIONS antes da requisição principal

    // Essa verificação permite futuras requisições 
    // realizadas pelo frontend
    if (metodo === "OPTIONS") {
        enviarSemConteudo(res);
        return true;
    }

    // Endpoint utilizado para 
    // verificar se o servidor esta funcionando
    if (metodo === "GET" && caminho === "/api/health") {
        enviarJson(res, 200, {
            status: "ok",
            mensagem: "Servidor funcionado"
        });

        return true;
    }
    
    // Encaminha o GET api/alunos para o método listar()
    // do AlunoController.
    if (metodo ==="GET" && caminho === "/api/alunos") {
        AlunoController.listar(req, res);
        return true;
    }

    // Encaminha POST /api/alunos para o método
    // cadastrar() do alunoController;
    if(metodo === "POST" && caminho === "/api/alunos") {
        await AlunoController.cadastrar(req, res);
        return true;
    }
    // Retorna false quando nenhuma rota corresponde a requisição recebida.
    return false;
}
