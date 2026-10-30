// ESTE OBJETO CONTEM OS CABEÇALHOS RELACIONADOS AO CORS.
// CROSS-ORIGIN RESOURCE SHARING

const cabecalhosCors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
};

// ENVIA UMA RESPOSTA NO FORMATO JSON
export function enviarJson(res, status, dados) {

        // CONVERTE UM VALOR JAVASCRIPT PARA UMA STRING NO FORMATO JSON
    const textoJson = JSON.stringify(dados, null, 2);

        // DEFINE STATUS DA RESPOSTA E CABEÇALHO HTTP
    res.writeHead(status, {
        
        // INFORMA QUE O CONTEUDO É JSON E UTILIZA UTF-8
        "Content-Type": "application/json; charset=utf-8",
        
        // O operador de espalhamento adiciona os cabeçalhos CORS ao objeto
        ...cabecalhosCors  
    });

    // Finaliza a resposta e envia o conteúdo para quem realizou a requisição.
    res.end(textoJson);
}

// Envia uma resposta sem conteudo(será utilizada nas requisições options, automatiacmente pelo navegador em determinadas situações envolvendo o CORS.)
export function enviarSemConteudo(res) {
    // Status 204 significa:
    // Requisição processada com sucesso
    res.writeHead(204, cabecalhosCors);

    // Finaliza resposta sem enviar um corpo
    res.end();
}
    // Le o corpo de uma reuqisicao e transforma 
    // o JSON em um objeto Javascript

    // É assincrona pois pode chegar 
    // ao servidor dividido em partes.
    export function lerCorpoJson(req) {
        
        // Criamos e retornamos uma promise
        // (Uma operação que será concluída no futuro)
        return new Promise((resolve, reject) =>{
            
            // Esta variável armazenará as partes recebidas
            // durante a leitura da requisição
            let corpo = "";

            // O evento "data" é executado sempre
            // que uma nova parte dos dados chega ao servidor.
            req.on("data", parte =>{
                
                // Cada parte recebida 
                // é acrescentada à variável corpo.
                corpo += parte;
            }) ;
            
            // O evento "end" é executado quando o servidor
            // termina de receber todo o corpo da requisição
            req.on("end",()=> {
                
                // Se o corpo estiver vazio, consideremos que 
                // recebemos um objeto vazio
                if (corpo.trim() === "") {
                    resolve({});
                    return;
                }

                try {
                    // Transforma JSON em objeto javascript
                    const dados = JSON.parse(corpo);

                    // A promise é concluida com sucesso
                    // E devolve os dados convertidos
                    resolve(dados);
                } catch (erro) {
                    // Se o JSON estiver errado a promise será rejeitada
                    reject(erro);
                }
            });

            // Esse evento aparece caso ocorro algum problema 
            // durante a leitura da requisição

            req.on("error", erro => {
                reject(erro);
            });
        });
    }
