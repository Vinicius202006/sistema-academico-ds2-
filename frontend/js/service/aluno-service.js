const AlunoService = {
    
    // Endereço base dos endpoints relacionados
    // aos alunos
    URL_API: "http://localhost:3000/api/alunos",

    // Processa uma resposta recebida da api
    async processarResposta(resposta) {
        let resultado;

        try {
            // Converte o json recebido
            //em um objeto javascript
            resultado = await resposta.json();
        } catch (erro) {
            // Este erro ocorrerá se o servidor nao devolver
            // uma resposta JSON valida
            throw new Error(
                "O servidor retornou uma resposta inválida."
            );
        }

    // A propriedade ok será verdadeira para
    // respostas entre 200 e 299.
    if (!resposta.ok) {
        // Utiliza mensagem enviada pela API
        // se ela não existir, utiliza uma mensagem
        // generica
        throw new Error(
            resultado.mensagem ||
            "Não foi possível concluir a operação."
        );
    }

    // Devolve o objeto javascript pra quem chamou o service
    return resultado;
    },
    
    // Executa uma requisição e trata possíveis 
    // problemas de conexão com o backend
    async requisitar(opcoes = {}) {
        let resposta;

        try{
            // fetch() envia a requisicao
            //para a api 
            // O segundo argumento contém as opções,
            // como método, cabeçalhos e corpo
            resposta = await fetch(
                AlunoService.URL_API,
                opcoes
            );
        } catch(erro) {
            // Executado quando não for possivel estabelecer comunicação
            throw new Error(
                "Não foi possível conectar ao servidor."
            );
        }
        // Após reposta encaminhemos seu processamento a
        // outro método
        return AlunoService.processarResposta(resposta); 
    },
    
    // Solcita lista de alunos
    // GET é o metodo padrão do fetch e poderia ser omitida
    // mas será mantida para deixar o codigo explicito
    async listar() {
        const resultado = await AlunoService.requisitar({
            method: "GET",
            // Informa que o cliente espera receber JSON
            headers: {
                "Accept": "application/json"
            }
        });
        // A api retorna
        // {
        // total: 1
        // dados : [...]
        // }
        // 
        // O service devolve somente o array
        return resultado.dados;
    },

    // Envia os dados de um aluno para a API.
    async cadastrar(aluno) {
        return AlunoService.requisitar({
            // POST indica a criação de um recurso.
            method: "POST",

            // Content-ytpe informa que o corpo
            // da requisição está em JSON.

            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },

            // JSON.stringify() converte o objeto javascript para texto JSON;
            body: JSON.stringify(aluno)
        });
    }
};