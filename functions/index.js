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
    var pontuacaoTotal = 0;
    var pontuacaoPorJogo = new Array(48);


    //console.log(  usuario );
    for(i = 1; i<=64; i++){
        var bet = 'j' + i;
        var real = 'oj' + i; 
        if (i<=48) {
            //console.log('JOGO' + i);

            //coleta dados da aposta
            var timeA = bet + 'A';
            var timeB = bet + 'B';
            var prognostico = 'v' + bet;
            var golsA = usuario.etapa1[bet][timeA];
            var golsB = usuario.etapa1[bet][timeB];
            var quemGanhou = usuario.etapa1[bet][prognostico];

            //coleta dados do oficial
            var otimeA = real + 'A';
            var otimeB = real + 'B';
            var oprognostico = 'v' + real;
            var ogolsA = oficial.etapa1[real][otimeA];
            var ogolsB = oficial.etapa1[real][otimeB];
            var oquemGanhou = oficial.etapa1[real][oprognostico];
            
            //verifica a pontuacao
            if ( golsA == ogolsA && golsB == ogolsB ) {
                pontuacaoTotal = pontuacaoTotal + 10;
                pontuacaoPorJogo[i] = 10;
                //console.log('10pts');
            }
            else if ( quemGanhou == oquemGanhou ) {
                if( golsA == ogolsA || golsB == ogolsB ){
                    pontuacaoTotal = pontuacaoTotal + 7;
                    pontuacaoPorJogo[i] = 7;
                    //console.log('7pts');
                }
                else {
                    pontuacaoTotal = pontuacaoTotal + 5;
                    pontuacaoPorJogo[i] = 5;
                    //console.log('5pts');
                }
            }
            else if ( golsA == ogolsA || golsB == ogolsB ) {
                pontuacaoTotal = pontuacaoTotal + 2;
                pontuacaoPorJogo[i] = 2;
                //console.log('2pts');
            }
            else{
                //console.log('0pts');
                pontuacaoTotal = pontuacaoTotal + 0;
                pontuacaoPorJogo[i] = 0;
            }
        }
        else if (i>48 && i<=56) {

        }
        else if (i>56 && i<=60) {

        }
        else if (i>60 && i<=62 ) {

        }
        else if (i == 63) {

        }
        else if (i == 64) {

        }
    }
    console.log(pontuacaoPorJogo);
    console.log(pontuacaoTotal);
    return pontuacaoTotal;
}

function somaPontuacaoTotal(pontuacaoFaseGrupos, pontuacaoOitavas, pontuacaoQuartas,
    pontuacaoSemi, pontuacaoTerceiro, pontuacaoFinal) {
    return pontuacaoFaseGrupos + pontuacaoOitavas + pontuacaoQuartas +
        pontuacaoSemi + pontuacaoTerceiro + pontuacaoFinal;
}

function geraClassificacao(pontuacaoFaseGrupos, pontuacaoOitavas, pontuacaoQuartas,
    pontuacaoSemi, pontuacaoTerceiro, pontuacaoFinal, pontuacaoTotal) {
    return pontuacaoFaseGrupos + (pontuacaoOitavas * 1e3) + (pontuacaoQuartas * 1e6) +
        (pontuacaoSemi * 1e9) + (pontuacaoTerceiro * 1e12) +
        (pontuacaoFinal * 1e15) + (pontuacaoTotal * 1e18);
}