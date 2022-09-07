import { fire, move } from "./player.js";
import {mob} from "./mob.js"

const config = {
    width:  700,
    height: 500,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
    },
    scene:{
        preload: preload,
        create: create,
        update: update,
    }
}

var game = new Phaser.Game(config);
let position = 0;
let main;
let cursors;
let pointer;
var score_is = 0;
let tableMob = [];
let tableLaser = [];
var iMob = 0;
var iLaser = 0;
var lasercd = true;
var game_status = false;
var lunch_system = false;
let text;
let fond;
let fondmenu;
let fondend;
let t_ms;
let t_c;
let t_id;
let t_cdc;

function preload() {
    this.load.image('main',"images/Fenm_Rqlakats.png");
    this.load.image('laser',"images/laser.png");
    this.load.image('mob',"images/mob.png");
    this.load.image('background', 'images/background.png');
    this.load.image('menu-back', 'images/back_menu.png');
    this.load.image('end-back', 'images/back_end.png');
}

function create() {
    cursors = this.input.keyboard.createCursorKeys(); 
    pointer = this.input.activePointer; 
    //game lunch :
    fond = this.physics.add.image(3000,3000 ,'background');
    main = this.physics.add.image(-10,-10,'main');
    fondend = this.physics.add.image(3000,3000,'end-back');
    text = this.add.text(5, 0, 'score :', { font: '20px Arial' });
    fondmenu = this.physics.add.image(350,250,'menu-back');

}
function update() {
    if(pointer.isDown === true && game_status === false) {
        score_is = 0;
        game_status = true;
        lunch_system = true;
        fondend.x = -3000;
        fondend.y = -3000;
        text.x = 5;
        text.y = 0;
        text.setText("score : " + score_is);
    }
    if(game_status === true){
        interaction(this,cursors);
    }
    if (lunch_system === true){
        console.log("lunch game");
        fond.x = 350;
        fond.y = 250;
        fondmenu.x = -3000;
        fondmenu.y = -3000;
        main.x = 100;
        main.y = 100;
        t_ms = setInterval(() => mobSpawn(this), 1000 - (score_is * 10));
        t_c = setInterval(() => Collision(this), 1);
        t_id = setInterval(() => isDead(this), 1);
        t_cdc = setInterval(() => cdChange(), 1000);
        lunch_system = false;
    }    
}

function isDead(){
    var i = 0;
    while (i < tableMob.length) {
            if (tableMob[i]?.me.x < main.x && tableMob[i]?.me.x + 20 > main.x){
                if (tableMob[i]?.me.y - 10 < main.y && tableMob[i]?.me.y + 20 > main.y){
                    text.x = 320;
                    text.y = 280;
                    fondend.x = 350;
                    fondend.y = 250;
                    lunch_system = false;
                    destruc_mob();
                }
            }
        i ++
    }
    i = 0;
}

function destruc_mob(){
    var i = 0;
    console.log("fin");
    while (i < tableMob.length){
        if (tableMob[i]?.alive === true) {
            tableMob[i].alive = false;
        }
        i += 1;
    }
    game_status = false;
    clearInterval(t_ms);
    clearInterval(t_c);
    clearInterval(t_id);
    clearInterval(t_cdc);
    tableMob.splice(0,tableMob.length);
}


function Collision(){
    var i = 0;
    var b = 0;
    while (i < tableMob.length) {
        while(b < tableLaser.length){
            if (tableMob[i]?.me.x < tableLaser[b]?.me.x && tableMob[i]?.me.x + 20 > tableLaser[b]?.me.x){
                if (tableMob[i]?.me.y - 10 < tableLaser[b]?.me.y && tableMob[i]?.me.y + 20 > tableLaser[b]?.me.y){
                tableMob[i].alive = false;
                tableMob.splice(i,1);
                tableLaser[b].alive = false;
                tableLaser.splice(b,1);
                console.log(score_is);
                score_is = score_is + 1;
                text.setText("score : " + score_is);
                }
            }
            b++
        }
        b = 0;
        i ++
    }
    i = 0;
};

function mobSpawn(scene)
{
    let smx = Math.floor(Math.random() * 700);
    let smy = Math.floor(Math.random() * 500);
    tableMob[iMob] = new mob(scene,main,true,smx,smy);
    iMob += 1;
}

function cdChange(){
    lasercd = true;
}

function interaction(scene, cursors)
{   
    position = move(cursors, main, position)
    if(cursors.space.isDown && lasercd === true)
    {
        lasercd = false;
        fire(scene, position, main, tableLaser,iLaser);
        iLaser += 1;
    }
}

