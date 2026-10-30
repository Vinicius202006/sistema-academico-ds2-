// Atualizando a view - Versão com DOM

const AlunoView = {
    
    // Objeto que armazenará referências aos elementos HTML
    elementos: {},

    // Localiza e armazena os elementos da página
    // Deve ser executado antes dos demais
    iniciar() {
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

        AlunoView.elementos.totalAlunos =
            document.getElementById("total-alunos");

        AlunoView.elementos.saidaJson =
            document.getElementById("saida-json");
            
            // NOVA REFERÊNCIA DA VERSÃO 03
            
            AlunoView.elementos.botaoSalvar = 
            document.getElementById("botao-salvar");

            AlunoView.elementos.botaoLimpar =
    document.getElementById("btn-limpar-dados");

        },

        // Regisra uma função que será executada quando o 
        // formulário for enviado

        configurarFormulario(aoEnviar) {
            AlunoView.elementos.formulario.addEventListener(
                "submit",
                aoEnviar
            );
        },
        
        // Registra uma função que será executada ao clicar em limpar
        configurarBotaoLimpar(aoClicar) {
            AlunoView.elementos.botaoLimpar.addEventListener(
                "click",
                aoClicar
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

// Apresenta uma mensagem na interface(sucesso, erro ou informação)
exibirMensagem(mensagem, tipo) {
    AlunoView.elementos.mensagem.textContent = mensagem;

    // Classes usadads pelos CSS
    AlunoView.elementos.mensagem.className = 
    `mensagem ${tipo}`;
},

// Cria celula da tabela

// Textcontent é utilizado para inserir texto
// de forma segura, sem interpreta-lo como html
criarCelula(valor) {
    const celula = document.createElement("td");

    celula.textContent = valor;

    return celula;
},

// Exibe lista de alunos na tabela
exibirLista(alunos) {
    
    //Atualiza a quantidade total de alunos
    AlunoView.elementos.totalAlunos.textContent =
    `Total: ${alunos.length}`;
    
    // Remove as linhas exibidas anteriormente
    AlunoView.elementos.corpoTabela.innerHTML = "";

    // Se o array estiver vazio cria uma linha informando
    // que não existem alunos

    if (alunos.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 7;
        celula.textContent = 
        "Nenhum aluno foi cadastrado.";

        linha.appendChild(celula);

        AlunoView.elementos.corpoTabela.appendChild(
            linha
        );

        return;
    }

    // Cria uma linha para cada aluno recebido.
    alunos.forEach(aluno => {
        const linha = document.createElement("tr");

        linha.appendChild(
            AlunoView.criarCelula(aluno.id)
        );

        linha.appendChild(
            AlunoView.criarCelula(aluno.ra)
        );

        linha.appendChild(
            AlunoView.criarCelula(aluno.nome)
        );

        linha.appendChild(
            AlunoView.criarCelula(aluno.email)
        );

        linha.appendChild(
            AlunoView.criarCelula(aluno.curso)
        );

        linha.appendChild(
            AlunoView.criarCelula(aluno.turma)
        );

        linha.appendChild(
            AlunoView.criarCelula(
                aluno.ativo ? "Sim" : "Não"
            )
        );

        AlunoView.elementos.corpoTabela.appendChild(
            linha
        );
    });
},

// Exibe os alunos no formato JSON
exibirJson(alunos) {
    AlunoView.elementos.saidaJson.textContent =
    JSON.stringify(alunos, null, 2);
},

// Limpa os campos depois de um cadastro
limparFormulario() {
    AlunoView.elementos.formulario.reset();

    // Devolve o foco para o campo RA
    AlunoView.elementos.ra.focus();
},
    // Altera o estado do formulario durante uma operação assincrona
        alterarEstadoFormulario(processando) {
            // Impede varios envios enquanto a requisição estiver em andamento.
            AlunoView.elementos.botaoSalvar.disabled = 
            processando;

            // Modifica o texto apresentado no botão
            AlunoView.elementos.botaoSalvar.textContent =
            processando ? "Salvando..." : "Cadastrar aluno";
        }
};
