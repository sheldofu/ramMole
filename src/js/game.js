(function() {
  'use strict';

  function Game() {
    this.player = null;
    this.mole = null;
    this.platforms = null;
    this.ledge = null;
    this.edge = null;
  }


  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.physics.startSystem(Phaser.Physics.ARCADE);
      this.add.sprite(0, 0, 'sky');
      this.player = this.add.sprite(x, y, 'mole');
  
      //  The platforms group contains the ground and the 2 ledges we can jump on
      this.platforms = this.game.add.group();
      //  We will enable physics for any object that is created in this group
      this.platforms.enableBody = true;
      // Here we create the ground.
      this.ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
      //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
      this.ground.scale.setTo(2, 2);
      //  This stops it from falling away when you jump on it
      this.ground.body.immovable = true;
      //  Now let's create two ledges
      this.edge = this.platforms.create(400, 400, 'ground');

      this.ledge = this.platforms.create(-150, 250, 'ground');
      this.ledge.body.immovable = true;

      this.physics.arcade.enable(this.player);

      this.player.body.bounce.y = 0.2;
      this.player.body.gravity.y = 300;
      this.player.body.collideWorldBounds = true;


    },

    update: function () {
      this.physics.arcade.collide(this.player, this.platforms);
      this.cursors = this.input.keyboard.createCursorKeys();

    //  Reset the players velocity (movement)
    this.player.body.velocity.x = 0;
 
    if (this.cursors.left.isDown)
    {
        //  Move to the left
        this.player.body.velocity.x = -150;
 
        this.player.animations.play('left');
    }
    else if (this.cursors.right.isDown)
    {
        //  Move to the right
        this.player.body.velocity.x = 150;
 
        this.player.animations.play('right');
    }
    else
    {
        //  Stand still
        this.player.animations.stop();
 
        this.player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (this.cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.body.velocity.y = -300;
    }
    },

    onInputDown: function () {
      this.game.state.start('menu');
    }

  };

  window['rambunctiousmole'] = window['rambunctiousmole'] || {};
  window['rambunctiousmole'].Game = Game;

}());
