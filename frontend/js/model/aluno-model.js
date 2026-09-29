// Criando aluno Model
const AlunoModel = {
    // Array que armazena temporariamente os alunos

    alunos: [],

    // Padroniza valor textual antes de usa-lo

    normalizarTexto(valor) {
        if (valor === null || valor === undefined) {
            return "";
        }

        return String(valor).trim();
    },

    // Valida email
    validarEmail(email) {
        return email.includes("@") && email.includes(".");
    },

    // Localiza RA
    localizarPorRa(ra) {
        return AlunoModel.alunos.find(
            aluno => aluno.ra === ra
        );
    },

    // Cadastrar dados

    cadastrar(dados) {
        const ra = AlunoModel.normalizarTexto(dados.ra);
        const nome = AlunoModel.normalizarTexto(dados.nome);
        const email = AlunoModel.normalizarTexto(dados.email);
        const curso = AlunoModel.normalizarTexto(dados.curso);
        const turma = AlunoModel.normalizarTexto(dados.turma);

        //verifica campo vazio
        if (
            ra === "" ||
            nome === "" ||
            email === "" ||
            curso === "" ||
            turma === "" 
        ) {
            // Devolve objeto ao inves da mensagem:
            return {
                sucesso: false,
                mensagem: "Todos os campos são obrigatórios."
            };
        }
        // Envia o email para o método validar email
        if (!AlunoModel.validarEmail(email)) {
            return {
                sucesso: false,
                mensagem: "Informe um email valido."
            };
        }
        // Verifica se RA não se repete(de outro aluno)
        if (AlunoModel.localizarPorRa(ra)) {
            return {
                sucesso: false,
                mensagem: "Já existe um aluno com esse RA."
            };
        }

        // Objeto representante do Aluno
        const aluno = {
            id: AlunoModel.alunos.length + 1,

            ra: ra,
            nome: nome,
            email: email,
            curso: curso,
            turma: turma,

            // Todo aluno começa como ativo
            ativo: true
            // 
        };
        // A partir desse momento o aluno faz parte dos dados assegurados no model
        AlunoModel.alunos.push(aluno);

        //Informa que o cadastro foi concluido

        //Devolve o aluno criado para que o controller o mande para o view
        return {
            sucesso: true,
            aluno: aluno
        };
    },

    //Devolve a lista de alunos cadastrados

    //spead(...) cria um novo array contendo os mesmos alunos para não precisarmos
    //devolvermos o array original armazenado no model
    listar() {
        return [...AlunoModel.alunos];
    }
};