import React, { Component } from 'react';
import Phaser from 'phaser';

import './App.scss';

class Scene1 extends Phaser.Scene {

  constructor() {

    super();
    Phaser.Scene.call(this, { key: 'Scene1' });

  }

  preload = function() {

    this.load.tilemapTiledJSON('hometown', 'assets/hometown.json');
    this.load.image('tiles', 'assets/img/tileset.png');
    this.load.spritesheet('player', 'assets/img/character.png', {frameWidth: 14, frameHeight: 21});

  }

  create = function() {

    let map = this.add.tilemap('hometown');

    let tileset = map.addTilesetImage('hometown','tiles');

    map.createStaticLayer('Background', tileset);
    let collisionTiles = map.createStaticLayer('collision', tileset)
    collisionTiles.setCollisionByExclusion([-1]);

    this.player = this.physics.add.sprite(128, 128, 'player', 4);
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;

    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, collisionTiles);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);

    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { frames: [1, 5, 1, 9]}),
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', { frames: [0, 4, 0, 8]}),
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { frames: [2, 6, 2, 10]}),
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { frames: [3, 7, 3, 11]}),
        frameRate: 8,
        repeat: -1
    });

    this.player.direction = 'down';
    this.player.canMove = true;
    this.player.setOrigin(0, 0);
    this.player.targetX = this.player.x;
    this.player.targetY = this.player.y;

    this.player.handleMovement = () => {

      this.player.x = Math.round(this.player.x);
      this.player.y = Math.round(this.player.y);

          if (this.cursors.left.isDown && this.player.canMove)
          {
              this.player.body.setVelocityX(-32);
              this.player.anims.play('left', true);
              this.player.direction = 'left';
              this.player.canMove = false;
              this.player.targetX -= 16;
          }
          else if (this.cursors.right.isDown && this.player.canMove)
          {
              this.player.body.setVelocityX(32);
              this.player.anims.play('right', true);
              this.player.direction = 'right';
              this.player.canMove = false;
              this.player.targetX += 16;
          }
          else if (this.cursors.up.isDown && this.player.canMove)
          {
              this.player.body.setVelocityY(-32);
              this.player.anims.play('up', true);
              this.player.direction = 'up';
              this.player.canMove = false;
              this.player.targetY -= 16;
          }
          else if (this.cursors.down.isDown && this.player.canMove)
          {
              this.player.body.setVelocityY(32);
              this.player.anims.play('down', true);
              this.player.direction = 'down';
              this.player.canMove = false;
              this.player.targetY += 16;
          }
          else if (this.player.canMove) {

            this.player.body.setVelocity(0);
            this.player.anims.play(this.player.direction, 0);
            this.player.anims.stop();

          }

          if (!this.player.canMove) {

            console.log(this.player.direction, this.player.x, this.player.y, this.player.targetX, this.player.targetY);

            if (this.player.targetX === this.player.x && this.player.targetY === this.player.y) {
              this.player.canMove = true;
              this.player.setVelocity(0);
            }

          }

    }

  }

  update = () => {

    this.player.handleMovement();

  }

}

class App extends Component {

  constructor() {

    super();

    this.state = {

      phaserConfig: {

        type: Phaser.AUTO,
        parent: 'main-app',
        width: 400,
        height: 300,
        zoom: 2,
        pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 }
            }
        },
        scene: [
            Scene1
        ]

      },

      game: {}

    }

  }

  componentDidMount() {

    this.setState({game: new Phaser.Game(this.state.phaserConfig)}, () => this.state.game.forceSingleUpdate = true);

  }

  render() {
    return (
      <div id='main-app'></div>
    );
  }
}

export default App;
