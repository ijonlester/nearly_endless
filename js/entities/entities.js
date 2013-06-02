/*------------------- 
a player entity
-------------------------------- */
game.PlayerEntity = me.ObjectEntity.extend({
 
    /* -----
 
    constructor
 
    ------ */
 
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);
 
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(2, 2);
 
        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
 
    },
 
    /* -----
 
    update the player pos
 
    ------ */
    update: function() {
		var newAngle = this.angle;
        if (me.input.isKeyPressed('left')) {
            // flip the sprite on horizontal axis
            //this.flipX(true);
			newAngle = Number.prototype.degToRad(180);
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            // unflip the sprite
            //this.flipX(false);
			newAngle = Number.prototype.degToRad(0);
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
		} else if (me.input.isKeyPressed('up')) {
			newAngle = Number.prototype.degToRad(-90);
            this.vel.y -= this.accel.y * me.timer.tick;
		} else if (me.input.isKeyPressed('down')) {
			newAngle = Number.prototype.degToRad(90);
            this.vel.y += this.accel.y * me.timer.tick;
        } else {
            this.vel.x = 0;
			this.vel.y = 0;
        }
		
        // check & update player movement
		this.renderable.angle = newAngle;
        this.updateMovement();
 
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent();
			
            return true;
        }
         
        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    }
 
});
