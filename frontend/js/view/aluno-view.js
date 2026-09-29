// Criando a view
const AlunoView = {

    // Solicita, recebe e armazena os valores em um objeto:

    lerDados() {
        return {
        ra: prompt("Digite o RA do aluno:"),
        nome: prompt("Digite o nome do aluno"),
        email: prompt("Digite o email do aluno"),
        curso: prompt("Digite o curso do aluno"),
        turma: prompt("Digite a turma:"),
    };
},

// Apresenta o aluno que foi cadastrado

// O parametro aluno recebe o objeto criado pelo model
// e encaminha pelo controller.

exibirAluno(aluno) {

    // Apresenta uma mensagem de sucesso no console
    console.log("Aluno cadastrado com sucesso.");
    
    // Apresenta as propriedadades do objeto no
    // formato tabela
    console.table(aluno);
},
    // Apresenta uma mensagem de erro 
    //Model identifica, controller recebe e envia para
    // a view que exibe
    exibirErro(mensagem) {
    //Exibe o erro no console
    console.error("Erro: ", mensagem);
    },
    
    //Questiona se o usuário deseja fazer outro cadastro
    //O controller pegará a resposta e dará o devido destino
    //a vontade do usuário
    perguntarNovoCadastro() {
        return confirm("Deseja cadastrar outro aluno?");
    },

    //exibe lista completa de alunos

    // O parâmetro alunos deverá receber um array:

    exibirLista(alunos) {

    // Exibe a quantidade de alunos cadastrados

        console.log(
            "Quantidade de alunos cadastrados:",
            alunos.length
        );

        // Verifica se o array esta vazio
        // Se sim exibe nenhum aluno cadastrado

        if (alunos.length === 0) {
            console.log("Nenhum aluno foi cadastrado.");

            //return encerra o método

            // não executando o console.table quando não
            // quando não houver alunos
            return;
        }
        // Caso o contrario, apresentará os alunos
        // no formato de tabela
        console.table(alunos);
    },
    // Apresenta os alunos convertido para JSON
    exibirJson(textoJson) {
        console.log("Alunos em formato JSON:");

        // Exibe no console
        console.log(textoJson);
    },

    // Transforma o JSON em um array de objetos novamente

    exibirDadosRecuperados(dados) {
        console.log("Dados reconstruidos com JSON.parse(): ");

        //Aoresenta a tabela do array novamente
        console.table(dados);
    }
};