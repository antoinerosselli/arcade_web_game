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
let score;
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


function preload() {
    this.load.image('main',"images/Fenm_Rqlakats.png");
    this.load.image('laser',"images/laser.png");
    this.load.image('mob',"images/mob.png");
    this.load.image('background', 'images/background.png');
    this.load.image('menu-back', 'images/back_menu.png');
}

function create() {
    cursors = this.input.keyboard.createCursorKeys(); 
    pointer = this.input.activePointer; 
    //game lunch :
    fond = this.physics.add.image(3000,3000 ,'background');
    fondmenu = this.physics.add.image(350,250,'menu-back');
    main = this.physics.add.image(-10,-10,'main');

}
function update() {
    if(pointer.isDown === true && game_status === false) {
        game_status = true;
        lunch_system = true;
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
        setInterval(() => mobSpawn(this), 5000);
        setInterval(() => Collision(this), 1);
        setInterval(() => cdChange(), 1000);
        lunch_system = false;
    }    
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
                score += 1;
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
    let y = Math.floor(Math.random() * 200) + 20;
    tableMob[iMob] = new mob(scene,main,true);
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
        console.log(position);
        lasercd = false;
        fire(scene, position, main, tableLaser,iLaser);
        iLaser += 1;
    }
}

