import * as PIXI from 'pixi.js';

export class Wall {
  public sprite: PIXI.Sprite;

  constructor(app: PIXI.Application, x: number, y: number) {
    this.sprite = PIXI.Sprite.from('assets/wall.png');
    this.sprite.anchor.set(0.5);
    this.sprite.x = x;
    this.sprite.y = y;

    // Scale down if needed
    this.sprite.scale.set(0.5, 0.5);

    app.stage.addChild(this.sprite);
  }
}
