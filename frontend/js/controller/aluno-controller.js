//Atualizando o controller
const AlunoController = {
    // Método que inicia o funcionamento da aplicação
    // Inicia o processo de cadastro
    // E se repetira enquanto o usuario quiser
    iniciar() {
        
        // Solicita que a view localize os elementos html
        AlunoView.inicializar()

        //Entrega uma função pra view executar
        //Assim que o formulário for enviado
        AlunoView.configurarFormulario(
            function(dados) {
                AlunoController.cadastrar(dados);
            }
        );
        
        // Apresenta o estado inicial da aplicação
        AlunoController.atualizarVisualizacao();
    },

    // Coordena o cadastro de um aluno.
    cadastrar(dados){

        //Envia os daos para o model
        const resultado = AlunoModel.cadastrar(dados);

        // Se o model indentificar algum problema 
        //ele apresenta o erro e encerra este método
        if (!resultado.sucesso) {
            AlunoView.exibirErro(resultado.mensagem);
            return;
        }
        // Confirma o cadastro;
        AlunoView.exibirSucesso(
            `Aluno ${resultado.aluno.nome} cadastrado com sucesso.`
        );

        // Limpa o formulário
        AlunoView.limparFormulario();

        // Atualiza a tabela e o JSON
        AlunoController.atualizarVisualizacao();
        },

        // Atualiza todas as representações da lista de alunos;
            atualizarVisualizacao(){
                //Solicita ao model a lista atual
                const alunos = AlunoModel.listar();

                //Solicita que a view monte a tabela
                AlunoView.exibirLista(alunos);

                //Converte o array para texto JSON formatado.
                const textoJson = JSON.stringify(alunos, null, 2);

                //Solicita que a view apresente o JSON
                AlunoView.exibirJson(textoJson);
            } 
        };
//         // Coordena o cadastro de um aluni

//         // Variavel que controla repetição dos cadastros
//         let continuar = true;
        
//         // O laço se repetira enqunato o continuar for true
//         while(continuar) {
            
//             // Solicita que a view leia os dados do usuário
//             const dados = AlunoView.lerDados();

//             //Envia os dados recebidos da view para o model

//             //Cadastrar() devolve o objeto informando se a
//             //operação foi bem sucedida, e se não for 
//             //ele fala qual foi o erro.
//             const resultado = AlunoModel.cadastrar(dados);

//             //Verifica se ocorreu tudo certo
//             if (resultado.sucesso) {

//             // Solicita que a view aparesente o aluno
//             // controller não utiliza console.log/table diretamente
//             AlunoView.exibirAluno(resultado.aluno);
            
//             } else {
              
//                 // Se resultado.sucesso for false
//                 // Solicita a view que apresente o erro
//                 // identificado pelo model
//                 AlunoView.exibirErro(resultado.mensagem);
//             }

//             // Pergunta se o usuário deseja cadastrar outro aluno
//             continuar = AlunoView.perguntarNovoCadastro();
//         }
        
//         // Este trecho só será executado quando o laço terminar
        
//         // Solicita ao model a lista de alunos cadastrados
//         // listar() devolve um array com os alunos.
//         const alunos = AlunoModel.listar();

//         //Envia a lista para a view exibir
//         // A view exibira a quantidade de alunos e se houver
//         // registros, uma tabela
//         AlunoView.exibirLista(alunos);

//         // Converte o array em JSON
//         const textoJson = JSON.stringify(alunos, null, 2);

//         // Solicita que a view exiba o texto JSON
//         AlunoView.exibirJson(textoJson);

//         // Converte o JSON em um valor JavaScript novamente
//         const dadosRecuperados = JSON.parse(textoJson);

//         //Solicita que a view apresente os dados reconstruidos 
        
//         /* ISSO MOSTRA QUE O JSON PODE SER UTILIZADO
//         PARA TRANSPORTAR DADOS E DEPOIS RECONSTRUI-LOS*/

//         AlunoView.exibirDadosRecuperados(dadosRecuperados);
//     }
// };

// Inicia a aplicacao

// Se, esta chamda, o objeto AlunoController exisitira,
//mas o processo de cadastro não seria executado
AlunoController.iniciar();