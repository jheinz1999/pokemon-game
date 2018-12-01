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

    this.player = this.physics.add.sprite(400, 400, 'player', 4);
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

    console.log(this.scale);

  }

  update = () => {

    this.player.body.setVelocity(0);

        if (this.cursors.left.isDown)
        {
            this.player.body.setVelocityX(-80);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(80);
            this.player.anims.play('right', true);
        }
        else if (this.cursors.up.isDown)
        {
            this.player.body.setVelocityY(-100);
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.setVelocityY(80);
            this.player.anims.play('down', true);
        }
        else {

          this.player.anims.stop();

        }

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
