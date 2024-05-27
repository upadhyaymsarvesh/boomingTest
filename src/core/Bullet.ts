import * as PIXI from 'pixi.js';

export class Bullet {
  public sprite: PIXI.Sprite;
  public isAlive: boolean = true;
  public damage: number;
  private app: PIXI.Application;
  private speed: number = 10;

  constructor(app: PIXI.Application, x: number, y: number, rotation: number, damage: number) {
    this.app = app;
    this.damage = damage;

    this.sprite = PIXI.Sprite.from('assets/bullet.png');
    this.sprite.anchor.set(0.5);
    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.rotation = rotation;

    // Scale down if needed
    this.sprite.scale.set(0.5, 0.5);

    app.stage.addChild(this.sprite);
  }

  update() {
    if (this.isAlive) {
      this.sprite.x += Math.cos(this.sprite.rotation) * this.speed;
      this.sprite.y += Math.sin(this.sprite.rotation) * this.speed;

      if (this.sprite.x < 0 || this.sprite.x > this.app.screen.width || this.sprite.y < 0 || this.sprite.y > this.app.screen.height) {
        this.destroy();
      }
    }
  }

  destroy() {
    this.isAlive = false;
    this.sprite.destroy();
  }
}
