// Criando aluno Model
const AlunoModel = {

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
        localizarPorRa(alunos, ra) {
    return alunos.find(
        aluno => aluno.ra === ra
    );
},

    // Calcula proximo identificador(se não houver nenhum cadastrado o primeiro id será 1)
    gerarProximoId(alunos) {
        if (alunos.length === 0) {
            return 1;
        }
    
        //Cria um array contendo somente os IDs
        const ids = alunos.map(
            aluno => aluno.id
        );

        // MathMax encontra o maior ID
        //Spread entrega cada numero do array como argumento para o mathmax
        const maiorId = Math.max(...ids);

        return maiorId + 1;
    },

    // Cadastrar dados

    criar(dados, alunos) {
        const ra = AlunoModel.normalizarTexto(dados.ra);
        const nome = AlunoModel.normalizarTexto(dados.nome);
        const email = AlunoModel.normalizarTexto(dados.email);
        const curso = AlunoModel.normalizarTexto(dados.curso);
        const turma = AlunoModel.normalizarTexto(dados.turma);

        //verifica campos obrigatórios
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
        if (AlunoModel.localizarPorRa(alunos, ra)) {
    return {
        sucesso: false,
        mensagem: "Já existe um aluno com esse RA."
    };
}

        // Objeto representante do Aluno
        const aluno = {
            id: AlunoModel.gerarProximoId(alunos),
            ra: ra,
            nome: nome,
            email: email,
            curso: curso,
            turma: turma,

            // Todo aluno começa como ativo
            ativo: true
        };
        // Devolve o objeto para a camada service
        //O model não utiliza push nem local storage
        return {
            sucesso: true,
            aluno: aluno
        };
    }
};
