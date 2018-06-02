const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var db = admin.database();

exports.calculaPontuacao = functions.database.ref('/oficial').onWrite((change, context) => {
    const oficial = change.after.val();
    return db.ref('apostas').once('value', (snap) => {
        snap.forEach((childNode) => {
            var aposta = childNode.val();
            var pontuacaoFaseGrupos = calculaFaseGrupos(oficial, aposta);
            var pontuacaoOitavas = 0;
            var pontuacaoQuartas = 0;
            var pontuacaoSemi = 0;
            var pontuacaoTerceiro = 0;
            var pontuacaoFinal = 0;
            var pontuacaoTotal = somaPontuacaoTotal(pontuacaoFaseGrupos, pontuacaoOitavas, pontuacaoQuartas,
                pontuacaoSemi, pontuacaoTerceiro, pontuacaoFinal)

            var classificacao = geraClassificacao(pontuacaoFaseGrupos, pontuacaoOitavas, pontuacaoQuartas,
                pontuacaoSemi, pontuacaoTerceiro, pontuacaoFinal, pontuacaoTotal)

            db.ref('usuarios/' + childNode.key).update({
                pontuacaoFaseGrupos,
                pontuacaoOitavas,
                pontuacaoQuartas,
                pontuacaoSemi,
                pontuacaoTerceiro,
                pontuacaoFinal,
                pontuacaoTotal,
                classificacao
            });
        });
    });
});

function calculaFaseGrupos(oficial, usuario) {
    return 10;
}

function somaPontuacaoTotal(pontuacaoFaseGrupos, pontuacaoOitavas, pontuacaoQuartas,
    pontuacaoSemi, pontuacaoTerceiro, pontuacaoFinal) {
    return pontuacaoFaseGrupos + pontuacaoOitavas + pontuacaoQuartas +
        pontuacaoSemi + pontuacaoTerceiro + pontuacaoFinal;
}

function geraClassificacao(pontuacaoFaseGrupos, pontuacaoOitavas, pontuacaoQuartas,
    pontuacaoSemi, pontuacaoTerceiro, pontuacaoFinal, pontuacaoTotal) {
    return pontuacaoFaseGrupos + (pontuacaoOitavas * 100) + (pontuacaoQuartas * 10000) +
        (pontuacaoSemi * 10e6) + (pontuacaoTerceiro * 10e8) +
        (pontuacaoFinal * 10e10) + (pontuacaoTotal * 10e12);
}