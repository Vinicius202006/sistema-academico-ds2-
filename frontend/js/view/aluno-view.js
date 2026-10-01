// Atualizando a view - Versão com DOM

const AlunoView = {
    
    // Objeto que armazenará referências aos elementos HTML
    elementos: {},

    // Localiza e armazena os elementos da página
    // Deve ser executado antes dos demais
    inicializar() {
        AlunoView.elementos.formulario = 
            document.getElementById("form-aluno");

        AlunoView.elementos.ra = 
            document.getElementById("ra");
        
        AlunoView.elementos.nome =
            document.getElementById("nome");

        AlunoView.elementos.email =
            document.getElementById("email");

        AlunoView.elementos.curso =
            document.getElementById("curso");

        AlunoView.elementos.turma = 
            document.getElementById("turma");

        AlunoView.elementos.mensagem =
            document.getElementById("mensagem");

        AlunoView.elementos.corpoTabela = 
            document.getElementById("corpo-tabela-alunos");

        AlunoView.elementos.corpoTabela =
            document.getElementById("corpo-tabela-alunos");

        AlunoView.elementos.totalAlunos =
            document.getElementById("total-alunos");

        AlunoView.elementos.saidaJson =
            document.getElementById("saida-json");

        },

        // Regisra uma função que será executada quando o 
        // formulário for enviado

        // O parâmetro aoEnviar é uma função recebida do controller
        configurarFormulario(aoEnviar) {
            AlunoView.elementos.formulario.addEventListener(
                "submit",
                function (evento) {
                    // Impede o comportamento padrão do formulário,
                    // que seria recarregar a página.
                    evento.preventDefault();
                    // Lê os valores atuais do formulario
                    const dados = AlunoView.lerDados();
                    // Envia os dados para a função fornecida pelo controller
                    aoEnviar(dados);
                }
            );
        },
    
    // A view coleta somente valores
    // Le as propriedades value de cada campo:
    lerDados() {
        return {
        ra: AlunoView.elementos.ra.value,
        nome: AlunoView.elementos.nome.value,
        email: AlunoView.elementos.email.value,
        curso: AlunoView.elementos.curso.value,
        turma: AlunoView.elementos.turma.value
    };
},

// Apresenta uma mensagem de sucesso
exibirSucesso(mensagem) {
    AlunoView.elementos.mensagem.textContent = mensagem;

    // Classes usadads pelos CSS
    AlunoView.elementos.mensagem.className = 
    "mensagem sucesso";
},

// Apresenta uma mensagem de erro
exibirErro(mensagem) {
    AlunoView.elementos.mensagem.textContent = mensagem;

    // Classes usadads pelos CSS
    AlunoView.elementos.mensagem.className = 
    "mensagem erro";
},

// Limpa os formulários depois de um cadastro bem sucedido
    limparFormulario() {
        AlunoView.elementos.formulario.reset()
// Volta o foco ao RA para facilitar o próximo cadastro
        AlunoView.elementos.ra.focus();
    },

// Apresenta a lista de alunos na tabela
exibirLista(alunos) {
const corpoTabela = AlunoView.elementos.corpoTabela;

// Remove as linhas apresentandas anteriormente 
corpoTabela.textContent = "";

//Atualiza a quantidade de alunos.
AlunoView.elementos.totalAlunos.textContent = 
    `Total: ${alunos.length}`;

// Se não houver alunos cria uma linha informativa

if (alunos.length === 0) {
    const linha = document.createElement("tr");
    const celula = document.createElement("td");

    celula.colSpan = 7;
    celula.textContent =
    "Nenhum aluno foi cadastrado.";

    linha.appendChild(celula);
    corpoTabela.appendChild(linha);

    return;
}

//percorre o array e cria uma linha para cada aluno.
alunos.forEach(function (aluno) {
    const linha = document.createElement("tr");

    //Organiza os valores na mesma ordem das
    //colunas existentes no HTML
    const valores = [
        aluno.id,
        aluno.ra,
        aluno.nome,
        aluno.email,
        aluno.curso,
        aluno.turma,
       
        //Operador ternário:
        // True = Ativo, False = Inativo.
        aluno.ativo ? "Ativo" : "Inativo"
    ];
//Cria uma celula para cada valor

valores.forEach(function (valor) {
    const celula = document.createElement("td");

    //textContent insere o valor como texto

    // Não utilizamos innerHTML com dados fornecidos pelo 
    //usuario
    celula.textContent = valor;

            linha.appendChild(celula);
            });
    corpoTabela.appendChild(linha);
        });
    },
// Apresenta o texto JSON dentro da tag pre.
exibirJson(textoJson) {
    AlunoView.elementos.saidaJson.textContent = textoJson;
    }
};
 
// O parametro aluno recebe o objeto criado pelo model
// e encaminha pelo controller.

// exibirAluno(aluno) {

//     // Apresenta uma mensagem de sucesso no console
//     console.log("Aluno cadastrado com sucesso.");
    
//     // Apresenta as propriedadades do objeto no
//     // formato tabela
//     console.table(aluno);
// },
//     // Apresenta uma mensagem de erro 
//     //Model identifica, controller recebe e envia para
//     // a view que exibe
//     exibirErro(mensagem) {
//     //Exibe o erro no console
//     console.error("Erro: ", mensagem);
//     },
    
//     //Questiona se o usuário deseja fazer outro cadastro
//     //O controller pegará a resposta e dará o devido destino
//     //a vontade do usuário
//     perguntarNovoCadastro() {
//         return confirm("Deseja cadastrar outro aluno?");
//     },

//     //exibe lista completa de alunos

//     // O parâmetro alunos deverá receber um array:

//     exibirLista(alunos) {

//     // Exibe a quantidade de alunos cadastrados

//         console.log(
//             "Quantidade de alunos cadastrados:",
//             alunos.length
//         );

//         // Verifica se o array esta vazio
//         // Se sim exibe nenhum aluno cadastrado

//         if (alunos.length === 0) {
//             console.log("Nenhum aluno foi cadastrado.");

//             //return encerra o método

//             // não executando o console.table quando não
//             // quando não houver alunos
//             return;
//         }
//         // Caso o contrario, apresentará os alunos
//         // no formato de tabela
//         console.table(alunos);
//     },
//     // Apresenta os alunos convertido para JSON
//     exibirJson(textoJson) {
//         console.log("Alunos em formato JSON:");

//         // Exibe no console
//         console.log(textoJson);
//     },

//     // Transforma o JSON em um array de objetos novamente

//     exibirDadosRecuperados(dados) {
//         console.log("Dados reconstruidos com JSON.parse(): ");

//         //Aoresenta a tabela do array novamente
//         console.table(dados);
//     }
// };