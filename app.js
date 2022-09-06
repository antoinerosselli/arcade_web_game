import { fire, move } from "./player.js";
import {mob} from "./mob.js"

const config = {
    width:  500,
    height: 300,
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
let tableMob = [];
let tableLaser = [];
var iMob = 0;
var iLaser = 0;
var lasercd = true;

function preload() {
    this.load.image('main',"images/Fenm_Rqlakats.png");
    this.load.image('laser',"images/laser.png");
    this.load.image('mob',"images/mob.png");
}

function create() {
    cursors = this.input.keyboard.createCursorKeys();  
    //game lunch :
    main = this.physics.add.image(100,100,'main');
    setInterval(() => mobSpawn(this), 5000);
    setInterval(() => Collision(this), 1);
    setInterval(() => cdChange(), 1000)
}

function update() {
    interaction(this,cursors);
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

