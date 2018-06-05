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
            var pontuacaoPorJogoFaseGrupos = calculaPontuacaoPorJogoGrupos(oficial, aposta);
            
            var pontuacaoOitavas = calculaOitavas(oficial, aposta);
            var pontuacaoPorClassificadosOitavas = calculaPontuacaoPorClassificado_Oitavas(oficial, aposta);

            var pontuacaoQuartas = calculaQuartas(oficial, aposta);
            var pontuacaoPorClassificadosQuartas = calculaPontuacaoPorClassificado_Quartas(oficial, aposta);

            var pontuacaoSemi = calculaSemi(oficial, aposta);
            var pontuacaoPorClassificadosSemi = calculaPontuacaoPorClassificado_Semi(oficial, aposta);

            var pontuacaoTerceiro = calculaTerceiro(oficial, aposta);
            var pontuacaoFinal = calculaFINAL(oficial, aposta);
            
            var pontuacaoTotal = somaPontuacaoTotal(pontuacaoFaseGrupos, pontuacaoOitavas, pontuacaoQuartas, pontuacaoSemi, pontuacaoTerceiro, pontuacaoFinal)

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

            //coleta dados do oficial - fase de grupos
            var otimeA = real + 'A';
            var otimeB = real + 'B';
            var oprognostico = 'v' + real;
            var ogolsA = oficial.etapa1[real][otimeA];
            var ogolsB = oficial.etapa1[real][otimeB];
            var oquemGanhou = oficial.etapa1[real][oprognostico];
            
            //verifica a pontuacao
            if ( golsA === ogolsA && golsB === ogolsB ) {
                pontuacaoTotal = pontuacaoTotal + 10;
                pontuacaoPorJogo[i] = 10;
                //console.log('10pts');
            }
            else if ( quemGanhou === oquemGanhou ) {
                if( golsA === ogolsA || golsB === ogolsB ){
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
            else if ( golsA === ogolsA || golsB === ogolsB ) {
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
    }
    //console.log(pontuacaoPorJogo);
    console.log('pontuacao grupos: ' + pontuacaoTotal);
    return pontuacaoTotal;
}

function calculaPontuacaoPorJogoGrupos(oficial, usuario) {
    var pontuacaoTotal = 0;
    var pontuacaoPorJogo = new Array(48);


    //console.log(  usuario );
    for(i = 1; i<=48; i++){
        var bet = 'j' + i;
        var real = 'oj' + i; 

        //coleta dados da aposta
        var timeA = bet + 'A';
        var timeB = bet + 'B';
        var prognostico = 'v' + bet;
        var golsA = usuario.etapa1[bet][timeA];
        var golsB = usuario.etapa1[bet][timeB];
        var quemGanhou = usuario.etapa1[bet][prognostico];

        //coleta dados do oficial - fase de grupos
        var otimeA = real + 'A';
        var otimeB = real + 'B';
        var oprognostico = 'v' + real;
        var ogolsA = oficial.etapa1[real][otimeA];
        var ogolsB = oficial.etapa1[real][otimeB];
        var oquemGanhou = oficial.etapa1[real][oprognostico];
        
        //verifica a pontuacao
        if ( golsA === ogolsA && golsB === ogolsB ) {
            pontuacaoTotal = pontuacaoTotal + 10;
            pontuacaoPorJogo[i] = 10;
            //console.log('10pts');
        }
        else if ( quemGanhou === oquemGanhou ) {
            if( golsA === ogolsA || golsB === ogolsB ){
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
        else if ( golsA === ogolsA || golsB === ogolsB ) {
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
    return pontuacaoPorJogo;
}

// calcula os pontos das oitavas independente da posicao da selecao.
function calculaOitavas(oficial, usuario) {
    var pontuacaoTotal = 0;
    var pontuacaoPorClassificadoOitavas = new Array(15);

    for (i=1; i<=16; i++){
            
            var bet1 = 'oitavas' + i;
            if(i<=8)var bet2 = 'oitavas' + (i+8);
            else var bet2 = 'oitavas' + (i-8);
            
            var real1 = bet1;
            var real2 = bet2;
            var Aposta = usuario.etapa1[bet1][bet1];
            var primOficial = oficial.etapa1[real1][real1];
            var SegunOficial = oficial.etapa1[real2][real2];

            if (Aposta === primOficial){
                //console.log('selecao igual' + i);
                pontuacaoTotal = pontuacaoTotal + 5;
                pontuacaoPorClassificadoOitavas[i-1] = 5;
            }
            else if ( Aposta === SegunOficial ){
                //console.log('selecao igual' + i);
                pontuacaoTotal = pontuacaoTotal + 5;
                pontuacaoPorClassificadoOitavas[i-1] = 5;
            }
            else{
                //console.log('selecao direferente' + i);
                pontuacaoTotal = pontuacaoTotal + 0;
                pontuacaoPorClassificadoOitavas[i-1] = 0;
            }
    }
    console.log('pontuacao Oitavas: ' + pontuacaoTotal);
    return pontuacaoTotal;
}

function calculaPontuacaoPorClassificado_Oitavas(oficial, usuario) {
    var pontuacaoTotal = 0;
    var pontuacaoPorClassificadoOitavas = new Array(15);

    for (i=1; i<=16; i++){
            
            var bet1 = 'oitavas' + i;
            if(i<=8)var bet2 = 'oitavas' + (i+8);
            else var bet2 = 'oitavas' + (i-8);
            
            var real1 = bet1;
            var real2 = bet2;
            var Aposta = usuario.etapa1[bet1][bet1];
            var primOficial = oficial.etapa1[real1][real1];
            var SegunOficial = oficial.etapa1[real2][real2];

            if (Aposta === primOficial){
                //console.log('selecao igual' + i);
                pontuacaoTotal = pontuacaoTotal + 5;
                pontuacaoPorClassificadoOitavas[i-1] = 5;
            }
            else if ( Aposta === SegunOficial ){
                //console.log('selecao igual' + i);
                pontuacaoTotal = pontuacaoTotal + 5;
                pontuacaoPorClassificadoOitavas[i-1] = 5;
            }
            else{
                //console.log('selecao direferente' + i);
                pontuacaoTotal = pontuacaoTotal + 0;
                pontuacaoPorClassificadoOitavas[i-1] = 0;
            }
    }
    return pontuacaoTotal;
}

// calcula os pontos das quartas independente da posicao da selecao.
function calculaQuartas(oficial, usuario) {
    var pontuacaoTotal = 0;
    var pontuacaoPorClassificadoQuartas = new Array(7);
    //console.log('_________CALCULANDO QUARTAS______________');
    
    for(j=49; j<=56; j++) {
        
        var partida = 'j' + j;
        var IDtimeApostado = 'quartas' + (j-48); 
        var timeAPOSTA = usuario.etapa1[partida][IDtimeApostado];
        //console.log('---->time apostado: ' + timeAPOSTA);
        for (i=1; i<=8; i++){
            var IDtimeOficial = 'quartas' + i;
            var timeOFICIAL =  oficial.etapa1[IDtimeOficial][IDtimeOficial];
            //console.log('timeOFICIAL: ' + timeOFICIAL);
            if (timeAPOSTA === timeOFICIAL){
                pontuacaoTotal = pontuacaoTotal + 10;
                pontuacaoPorClassificadoQuartas[j-49] = 10;
                //console.log('********************deu bom pro time: ' + timeAPOSTA); 
                break;
            }
            else{
                pontuacaoTotal = pontuacaoTotal + 0;
                pontuacaoPorClassificadoQuartas[j-49] = 0;                
            }   
        }
        
    }
    console.log('pontuacao quartas: ' + pontuacaoTotal);
    //console.log('pontuacaoTotalVETOR:' + pontuacaoPorClassificadoQuartas);
    return pontuacaoTotal;
}

function calculaPontuacaoPorClassificado_Quartas(oficial, usuario) {
    var pontuacaoTotal = 0;
    var pontuacaoPorClassificadoQuartas = new Array(7);
    //console.log('_________CALCULANDO QUARTAS______________');
    
    for(j=49; j<=56; j++) {
        
        var partida = 'j' + j;
        var IDtimeApostado = 'quartas' + (j-48); 
        var timeAPOSTA = usuario.etapa1[partida][IDtimeApostado];
        //console.log('---->time apostado: ' + timeAPOSTA);
        for (i=1; i<=8; i++){
            var IDtimeOficial = 'quartas' + i;
            var timeOFICIAL =  oficial.etapa1[IDtimeOficial][IDtimeOficial];
            //console.log('timeOFICIAL: ' + timeOFICIAL);
            if (timeAPOSTA === timeOFICIAL){
                pontuacaoTotal = pontuacaoTotal + 10;
                pontuacaoPorClassificadoQuartas[j-49] = 10;
                //console.log('********************deu bom pro time: ' + timeAPOSTA); 
                break;
            }
            else{
                pontuacaoTotal = pontuacaoTotal + 0;
                pontuacaoPorClassificadoQuartas[j-49] = 0;                
            }   
        }
        
    }
    //console.log('pontuacao quartas: ' + pontuacaoTotal);
    //console.log('pontuacaoTotalVETOR:' + pontuacaoPorClassificadoQuartas);
    return pontuacaoPorClassificadoQuartas;
}

function calculaSemi(oficial, usuario) {
    var pontuacaoTotal = 0;
    var pontuacaoPorClassificadoQuartas = new Array(3);
    //console.log('_________CALCULANDO SEMI______________');
    
    for(j=57; j<=60; j++) {
        
        var partida = 'j' + j;
        var IDtimeApostado = 'semi' + (j-56); 
        var timeAPOSTA = usuario.etapa1[partida][IDtimeApostado];
        //console.log('---->time apostado: ' + timeAPOSTA);
        for (i=1; i<=4; i++){
            var IDtimeOficial = 'semi' + i;
            var timeOFICIAL =  oficial.etapa1[IDtimeOficial][IDtimeOficial];
            //console.log('timeOFICIAL: ' + timeOFICIAL);
            if (timeAPOSTA === timeOFICIAL){
                pontuacaoTotal = pontuacaoTotal + 15;
                pontuacaoPorClassificadoQuartas[j-57] = 15;
                //console.log('********************deu bom pro time: ' + timeAPOSTA); 
                break;
            }
            else{
                pontuacaoTotal = pontuacaoTotal + 0;
                pontuacaoPorClassificadoQuartas[j-57] = 0;                
            }   
        }
        
    }
    console.log('pontuacao semi: ' + pontuacaoTotal);
    //console.log('pontuacaoTotalVETOR:' + pontuacaoPorClassificadoQuartas);
    return pontuacaoTotal;
}

function calculaPontuacaoPorClassificado_Semi(oficial, usuario) {
    var pontuacaoTotal = 0;
    var pontuacaoPorClassificadoQuartas = new Array(3);
    //console.log('_________CALCULANDO SEMI______________');
    
    for(j=57; j<=60; j++) {
        
        var partida = 'j' + j;
        var IDtimeApostado = 'semi' + (j-56); 
        var timeAPOSTA = usuario.etapa1[partida][IDtimeApostado];
        //console.log('---->time apostado: ' + timeAPOSTA);
        for (i=1; i<=4; i++){
            var IDtimeOficial = 'semi' + i;
            var timeOFICIAL =  oficial.etapa1[IDtimeOficial][IDtimeOficial];
            //console.log('timeOFICIAL: ' + timeOFICIAL);
            if (timeAPOSTA === timeOFICIAL){
                pontuacaoTotal = pontuacaoTotal + 15;
                pontuacaoPorClassificadoQuartas[j-57] = 15;
                //console.log('********************deu bom pro time: ' + timeAPOSTA); 
                break;
            }
            else{
                pontuacaoTotal = pontuacaoTotal + 0;
                pontuacaoPorClassificadoQuartas[j-57] = 0;                
            }   
        }
        
    }
    //console.log('pontuacao semi: ' + pontuacaoTotal);
    //console.log('pontuacaoTotalVETOR:' + pontuacaoPorClassificadoQuartas);
    return pontuacaoPorClassificadoQuartas;
}

function calculaTerceiro(oficial, usuario) {
    var pontuacaoTotal = 0;
    //console.log('_________CALCULANDO TERCEIRO ______________');
    
    for(j=63; j<=63; j++) {
        
        var partida = 'j' + j;
        var IDtimeApostado = 'terceiro'; 
        var timeAPOSTA = usuario.etapa1[partida][IDtimeApostado];
        //console.log('---->time apostado: ' + timeAPOSTA);
        var IDtimeOficial = 'terceiro';
        var timeOFICIAL =  oficial.etapa1[IDtimeOficial][IDtimeOficial];
        //console.log('timeOFICIAL: ' + timeOFICIAL);
        if (timeAPOSTA === timeOFICIAL){
            pontuacaoTotal = pontuacaoTotal + 15;
            //console.log('********************deu bom pro time: ' + timeAPOSTA); 
        }
        else{
            pontuacaoTotal = pontuacaoTotal + 0;              
        }   
    }
    console.log('pontuacao terceiro: ' + pontuacaoTotal);
    return pontuacaoTotal;
}

function calculaFINAL(oficial, usuario) {
    var pontuacaoTotal = 0;
    //console.log('_________CALCULANDO FINAL ______________');
    
    for(j=64; j<=64; j++) {
        
        var partida = 'j' + j;
        var IDtimeCampeao = 'campeao';
        var IDtimeVice = 'vice';  
        var timeAPOSTAcampeao = usuario.etapa1[partida][IDtimeCampeao];
        var timeAPOSTAvice = usuario.etapa1[partida][IDtimeVice];
        //console.log('---->campeao apostado: ' + timeAPOSTAcampeao);
        //console.log('---->vice apostado: ' + timeAPOSTAvice);
        var timeOFICIALcampeao = oficial.etapa1[IDtimeCampeao][IDtimeCampeao];
        var timeOFICIALvice = oficial.etapa1[IDtimeVice][IDtimeVice];
        //console.log('---->campeao oficial: ' + timeOFICIALcampeao);
        //console.log('---->vice oficial: ' + timeOFICIALvice);
        
        if (timeAPOSTAcampeao === timeOFICIALcampeao){
            pontuacaoTotal = pontuacaoTotal + 40;
            //console.log('********************ACERTOU CAMPEAO'); 
        }
        else if(timeAPOSTAvice === timeOFICIALvice){
            pontuacaoTotal = pontuacaoTotal + 20;
            //console.log('********************ACERTOU VICE');
        }
        else{
            pontuacaoTotal = pontuacaoTotal + 0;              
        }   
    }
    console.log('pontuacao final: ' + pontuacaoTotal);
    return pontuacaoTotal;
}


function somaPontuacaoTotal(pontuacaoFaseGrupos, pontuacaoOitavas, pontuacaoQuartas,
    pontuacaoSemi, pontuacaoTerceiro, pontuacaoFinal) {
    var somaTotal = pontuacaoFaseGrupos + pontuacaoOitavas + pontuacaoQuartas + pontuacaoSemi + pontuacaoTerceiro + pontuacaoFinal;
    return somaTotal;
}

function geraClassificacao(pontuacaoFaseGrupos, pontuacaoOitavas, pontuacaoQuartas,
    pontuacaoSemi, pontuacaoTerceiro, pontuacaoFinal, pontuacaoTotal) {
    console.log()
    var pesoClassificação = (pontuacaoTotal * 1e11) + (pontuacaoFinal * 1e9) + (pontuacaoTerceiro * 1e9) + (pontuacaoSemi * 1e7) + (pontuacaoQuartas * 1e5) + (pontuacaoOitavas * 1e3) +  pontuacaoFaseGrupos;
    console.log(pesoClassificação);
    return pesoClassificação;

}
















