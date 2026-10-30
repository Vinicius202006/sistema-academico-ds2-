const AlunoController = {
    // Método que inicia o funcionamento da aplicação
    // Inicia o processo de cadastro
    // E se repetira enquanto o usuario quiser
    async iniciar() {
        
        // Solicita que a view localize os elementos html
        AlunoView.iniciar()

        //Entrega uma função pra view executar
        //Assim que o formulário for enviado
        AlunoView.configurarFormulario(
                AlunoController.cadastrar
        );

        // Informa que os dados estão sendo carregandos
        AlunoView.exibirMensagem(
            "Carregando alunos...",
            "informacao"
        );

        try {
            // Consulta os alunos existentes no servidor
            await AlunoController.atualizarVisualizacao();

            AlunoView.exibirMensagem(
                "Dados carregados com sucesso.",
                "sucesso"
            );
        } catch (erro) {
            AlunoView.exibirMensagem(
                erro.message,
                "erro"
            );
        }
    },

    // Executa o cadastro do aluno
    async cadastrar(evento) {
        // Evita o recarregamento da pagina
        evento.preventDefault();

        // Solciita a view os valores do formulario
        const dadosInformados = AlunoView.lerDados();

        // Encaminha os dados para valida~~ao inciial
        const validacao = AlunoModel.validar(
            dadosInformados
        );
        
        // Interrompe o processo acso a validação do frontend encontre problema
        if(!validacao.sucesso) {
            AlunoView.exibirMensagem(
            validacao.mensagem,
            "erro"
        );
        return;
        }

        // Desabilita o botão tmeporariamente
        AlunoView.alterarEstadoFormulario(true);

        AlunoView.exibirMensagem(
            "Enviando dados para o servidor...",
            "informacao"
        );

        try {
            // Envia o aluno para o backend
            const resultado = 
            await AlunoService.cadastrar(
                validacao.dados
            );

            // Consulta novamente a lista do servidor
            await AlunoController.atualizarVisualizacao();

            // Limpa o formulario depois do sucesso.
            AlunoView.limparFormulario();

            // Apresenta a mensagem devolvida pela api
            AlunoView.exibirMensagem(
                resultado.mensagem,
                "sucesso"
            );
        } catch (erro) {
            // Apresenta erros de validação da api,
            // RA duplicado ou falha de conexão
            AlunoView.exibirMensagem(
                erro.message,
                "erro"
            );
        } finally {
            // Blcoo finally sempre será executado indepnednte do sucesso ou erro
            AlunoView.alterarEstadoFormulario(false);
        }
    },

    // Consulta os alunos na api e atualiza a view
    async atualizarVisualizacao() {
    // Aguarda o service consultar o backend
    const alunos = await AlunoService.listar();

    // Atualiza a a tabela
    AlunoView.exibirLista(alunos);

    // Atualiza a apresentação em JSON
        AlunoView.exibirJson(alunos);
    }
};
// Inicia a aplicacao

// Se, esta chamda, o objeto AlunoController exisitira,
//mas o processo de cadastro não seria executado
AlunoController.iniciar();