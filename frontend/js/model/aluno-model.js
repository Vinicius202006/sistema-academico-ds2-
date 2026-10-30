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

    // Normaliza e valida os dados informados no formulario
    validar(dados) {
        // Cria um novo objeto com os valores
        // normalizados.
        const aluno = {
            ra: AlunoModel.normalizarTexto(dados.ra),
            nome: AlunoModel.normalizarTexto(dados.nome),

            // Email também será convertido para letras minusculas
            email: AlunoModel
                .normalizarTexto(dados.email) 
                .toLocaleLowerCase(),

                curso: AlunoModel.normalizarTexto(dados.curso),
                turma: AlunoModel.normalizarTexto(dados.turma)
        };

        //verifica campos obrigatórios
        if (
            aluno.ra === "" ||
            aluno.nome === "" ||
            aluno.email === "" ||
            aluno.curso === "" ||
            aluno.turma === "" 
        ) {
            // Devolve objeto ao inves da mensagem:
            return {
                sucesso: false,
                mensagem: "Todos os campos são obrigatórios."
            };
        }
        // Envia o email para o método validar email
        if (!AlunoModel.validarEmail(aluno.email)) {
            return {
                sucesso: false,
                mensagem: "Informe um email valido."
            };
        }
        // Se os dados forem válidos, devolvemos o objeto preparado para
        // ser enviado a API
        return {
            sucesso: true,
            dados: aluno
        };
    }
};
