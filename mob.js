import { laser } from "./laser.js";

export class mob {
    
    constructor(scene,main,alive){
        var me = scene.physics.add.image(10, Math.random() * 300 + 10,"mob");
        this.alive = alive;
        this.me = me;
        let t_move = setInterval(() => scene.physics.moveToObject(me, main, 10), 1000);
        let t_update = setInterval(() => this.update(me, main,t_move,t_update), 100);
        return(this);
    }

    update(me,t_move,t_update){
        if (this.alive === false){
            me.destroy();
            clearInterval(t_move);
            clearInterval(t_update);
        }
    }
}