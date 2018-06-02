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
            var pontuacaoTotal = pontuacaoFaseGrupos + pontuacaoOitavas + pontuacaoQuartas +
                pontuacaoSemi + pontuacaoTerceiro + pontuacaoFinal;

                db.ref('usuarios/' + childNode.key).update({
                pontuacaoFaseGrupos,
                pontuacaoOitavas,
                pontuacaoQuartas,
                pontuacaoSemi,
                pontuacaoTerceiro,
                pontuacaoFinal,
                pontuacaoTotal
            });
        });
    });
});

function calculaFaseGrupos(oficial, usuario) {
    return 10;
}