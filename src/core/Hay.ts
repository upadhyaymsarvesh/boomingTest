import * as PIXI from 'pixi.js';

export class Hay {
  public sprite: PIXI.Sprite;
  private health: number = 100;

  constructor(app: PIXI.Application, x: number, y: number) {
    this.sprite = PIXI.Sprite.from('assets/hay.png');
    this.sprite.anchor.set(0.5);
    this.sprite.x = x;
    this.sprite.y = y;

    // Scale down if needed
    this.sprite.scale.set(0.5, 0.5);

    app.stage.addChild(this.sprite);
  }

  takeDamage(damage: number) {
    this.health -= damage;
    if (this.health <= 0) {
      this.destroy();
    }
  }

  destroy() {
    this.sprite.destroy();
  }
}