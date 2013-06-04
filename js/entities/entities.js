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

        this.renderable.addAnimation('up', [8,9,10,11]);
        this.renderable.addAnimation('right', [12,13,14,15]);
        this.renderable.addAnimation('down', [0,1,2,3]);
        this.renderable.addAnimation('left', [4,5,6,7]);

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
            this.renderable.setCurrentAnimation('left');
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            this.renderable.setCurrentAnimation('right');
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
		} else if (me.input.isKeyPressed('up')) {
			this.renderable.setCurrentAnimation('up');
            this.vel.y -= this.accel.y * me.timer.tick;
		} else if (me.input.isKeyPressed('down')) {
			this.renderable.setCurrentAnimation('down');
            this.vel.y += this.accel.y * me.timer.tick;
        } else {
            this.vel.x = 0;
			this.vel.y = 0;
        }
		
        // check & update player movement
        this.updateMovement();
	this.collide();

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

game.treeEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "tree_tiles";
        settings.spritewidth = 32;
        settings.spriteheight = 48;
	this.parent(x, y, settings);

	this.renderable.addAnimation("static", [0]);
	this.renderable.setCurrentAnimation("static");
    },

    onCollision: function(res, obj) {
    	obj.pos.x -= res.x;
	obj.pos.y -= res.y;
    }
});
