export class laser {

    constructor(scene,position,main){
        var me = scene.physics.add.image(main.x,main.y,"laser");
        this.me = me;
        this.alive = true;
        let t_update = setInterval(() => this.update(me,t_update), 100);
        switch(position) 
        {
            case 1:
                me.setVelocity(0,-300);
                break;
            case 2:
                me.setVelocity(300,0);
                break;
            case 3:
                me.setVelocity(0,300);  
                break;
            case 4:
                me.setVelocity(-300,0);
                break;  
        }
        return (this);
    }
    
    update(me,t_update){
        if (this.alive === false){
            me.destroy();
            clearInterval(t_update);
        }
    }
}