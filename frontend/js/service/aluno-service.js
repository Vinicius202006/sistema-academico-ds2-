const AlunoService = {
    CHAVE_STORAGE: "sistema-academico-ds2:alunos",

    // Recupera os alunos armazenados
    listar() {
        // getItem() recupera o texto associado à chave

        //Se achave não exisitr o resultado será null;
        
        const textoJson = localStorage.getItem(
            AlunoService.CHAVE_STORAGE
        );

        // Se não houver nada armazenado, devolve um array vazio
        if (textoJson === null) {
            return [];
        }
        try {
            const dados = JSON.parse(textoJson)
        
            // confirma se é um array
            if (!Array.isArray(dados)) {
                return [];
            }

            return dados;
        
        } catch (erro) {
            // Se o conteúdo estiver corrompido
            // remove o valor inválido
            localStorage.removeItem(
                AlunoService.CHAVE_STORAGE
            );
            
            return [];
        }
    },

    // Converte o array para JSON e salva no navegador
    salvar(alunos) {
        const textoJson = JSON.stringify(alunos);

        localStorage.setItem(
            AlunoService.CHAVE_STORAGE,
            textoJson
        );
    },

    // Cordena o cadsatro de um aluno
    cadastrar(dados) {

        // Recupera a lista atual
        const alunos = AlunoService.listar();

        // Solicita ao model a validação e a 
        // criação de um novo aluno
        const resultado = AlunoModel.criar(
            dados,
            alunos
        );

        // Se o model indentifica um problema,
        // devolve o mesmo resultado ao controller
        if(!resultado.sucesso) {
            return resultado;
        }

        // Adiciona o aluno criado ao array
        alunos.push(resultado.aluno);

        // Salva o array atualizado
        AlunoService.salvar(alunos);

        // Devolve o resultado ao controller
        return resultado;
    },

    // Remove toda a lista armazenada.
    limpar() {
        localStorage.removeItem(
            AlunoService.CHAVE_STORAGE
        );
    }
};