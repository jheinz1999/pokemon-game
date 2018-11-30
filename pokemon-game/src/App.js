import React, { Component } from 'react';
import Phaser from 'phaser';

import './App.scss';

class App extends Component {

  constructor() {

    super();

    this.state = {

      phaserConfig: {

        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'main-app',
        scene:  {

          preload: this.preload,
          create: this.create,
          update: this.update

        }

      },

      game: {}

    }

  }

  componentDidMount() {

    this.setState({game: new Phaser.Game(this.state.phaserConfig)});

  }

  preload = function() {

    console.log(this);

    this.load.tilemapTiledJSON('hometown', 'assets/hometown.json');

    this.load.image('tiles', 'assets/img/tileset.png');

  }

  create = function() {

    let map = this.add.tilemap('hometown');

    let tileset = map.addTilesetImage('hometown','tiles');

    let layer = map.createStaticLayer('Tile Layer 1', tileset);

  }

  update = () => {



  }

  render() {
    return (
      <div id='main-app'></div>
    );
  }
}

export default App;
