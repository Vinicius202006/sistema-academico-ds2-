// Array para armazenamento temporário de alunos

const alunos = [];

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
        localizarPorRa(ra) {
    return alunos.find(
        aluno => aluno.ra === ra
    );
},

    // Calcula proximo identificador(se não houver nenhum cadastrado o primeiro id será 1)
    gerarProximoId() {
        if (alunos.length === 0) {
            return 1;
        }
    
        //Cria um array contendo somente os IDs
        const ids = alunos.map(
            aluno => aluno.id
        );

        // MathMax encontra o maior ID
        // O operador ... espalha os valores do array
        //Spread entrega cada numero do array como argumento para o mathmax
        const maiorId = Math.max(...ids);

        // O próximo id será o maior mais 1.
        return maiorId + 1;
    },

    // Cadastrar dados

    // O operador ? é um encadeamento o opcional
    // e evita um erro caso o objeto dados não tenha sido informado
    cadastrar(dados) {
        const ra = AlunoModel.normalizarTexto(dados?.ra);
        const nome = AlunoModel.normalizarTexto(dados?.nome);
        const email = AlunoModel.normalizarTexto(dados?.email);
        const curso = AlunoModel.normalizarTexto(dados?.curso);
        const turma = AlunoModel.normalizarTexto(dados?.turma);

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
                status: 400,
                mensagem: "Todos os campos são obrigatórios."
            };
        }
        // Envia o email para o método validar email
        if (!AlunoModel.validarEmail(email)) {
            return {
                sucesso: false,
                status: 400,
                mensagem: "Informe um email valido."
            };
        }
        // Verifica se RA não se repete(de outro aluno)
        if (AlunoModel.localizarPorRa(ra)) {
    return {
        sucesso: false,
        status: 409,
        mensagem: "Já existe um aluno com esse RA."
    };
}

        // Objeto representante do Aluno
        const aluno = {
            id: AlunoModel.gerarProximoId(),
            ra,
            nome,
            email,
            curso,
            turma,
            ativo: true
        };

        // Adiciona o aluno ao array armazenado em memória
        alunos.push(aluno);

        // Devolve o objeto para a camada service
        //O model não utiliza push nem local storage
        return {
            sucesso: true,
            status: 201,
            aluno
        };
    },
    // Devolve todos os alunos cadastrados.

    // ... = cria uma cópia do array
    // portanto:
    // Quem chamar listar() não receberá diretamente o array interno do model, mas sim uma cópia
    listar () {
        return [...alunos];
    }
};
    //Exposta o model para que ele posa ser importado pelo controller
    export default AlunoModel;
