var canvas;//o elemento canvas sobre o qual desenharemos
var ctx;//o "contexto" da canvas que será utilizado (2D ou 3D)
var dx = 10;//a tava de variação (velocidade) horizontal do objeto
var dy = 10;//a tava de variação (velocidade) vertical do objeto
var x = 250;//posição horizontal do objeto (com valor inicial)
var y = 100;//posição vertical do objeto (com valor inicial)
var WIDTH = 500;//largura da área retangular
var HEIGHT = 500;//altura da área retangular
var listaPonto = [];
var direcao = '';
var placar = 0;
var dimensao = 0;

function Colisao(x, y) {
    if(x +10 > listaPonto[0].x && x < (listaPonto[0].x + 10) && y + 10 > listaPonto[0].y && y < (listaPonto[0].y + 10)){
        listaPonto = [];
        placar++;
    }
}

function DesenharPersonagem() {
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.strokeRect(x, y, 10, 10);
    ctx.fill();    
}

function DesenharPonto() {
    if(listaPonto == 0){

        var ponto = new Object();
        ponto.x = Math.floor(Math.random() * (WIDTH - dx));
        ponto.y = Math.floor(Math.random() * (HEIGHT - dy));

        listaPonto.push(ponto);
    }

    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.strokeRect( listaPonto[0].x , listaPonto[0].y, 10, 10);
    ctx.fill();
}

function LimparTela() {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.rect(0, 0, WIDTH, HEIGHT);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function KeyDown(evt){
    switch (evt.keyCode) {
        case 38:  /*seta para cima */
            if (y - dy > 0){
                y -= dy;
                direcao = 'cima';
            }
            break;
        case 40:  /*set para baixo*/
            if (y + dy < HEIGHT){
                y += dy;
                direcao = 'baixo';
            }
            break;
        case 37:  /*set para esquerda*/
            if (x - dx > 0){
                x -= dx;
                direcao = 'esquerda';
            }
            break;
        case 39:  /*seta para direita*/
            if (x + dx < WIDTH){
                x += dx;
                direcao = 'direita';
            }
            break;
    }
}

function Andar() {
    if(x + 10 < HEIGHT && x > 0 && y + 10 < WIDTH && y > 0){
        switch (direcao) {
            case 'cima':
                y -= dy;
                break;
            case 'baixo':
                y += dy;
                break;
            case 'esquerda':
                x -= dx;
                break;
            case 'direita':
                x += dx;
                break;
            default:
                break;
        }
    }else{
        
    }
}

function Atualizar() {
    LimparTela();    
    DesenharPonto();
    DesenharPersonagem();
    Colisao(x, y);
    Andar();
}

function Iniciar() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    return setInterval(Atualizar, 100);
}

window.addEventListener('keydown',KeyDown,true);
Iniciar();
