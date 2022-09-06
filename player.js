import { laser } from "./laser.js";

export function move(cursors, main, position)
{
    main.setVelocity(0);
    if(cursors.up.isDown){
        main.setVelocity(0, -300);
        position = 1;
    }

    if(cursors.down.isDown){
        main.setVelocity(0, 300);
        position = 3;
    }

    if(cursors.right.isDown){
        main.setVelocity(300, 0);
        position = 2;
    }

    if(cursors.left.isDown){
        main.setVelocity(-300, 0);
        position = 4;
    }
    return position;
}

export function fire(scene,position, main, tableLaser,iLaser)
{
   tableLaser[iLaser] = new laser(scene,position,main);
   iLaser += 1;
   return(tableLaser);
}