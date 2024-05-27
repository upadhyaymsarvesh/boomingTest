import * as PIXI from 'pixi.js';
import { Bullet } from './Bullet';

export class Tank {
  public sprite: PIXI.Sprite;
  public bullets: Bullet[] = [];
  private app: PIXI.Application;
  private damage: number;
  private bulletCount: number;

  constructor(app: PIXI.Application, texture: string, damage: number, bulletCount: number) {
    this.app = app;
    this.damage = damage;
    this.bulletCount = bulletCount;

    this.sprite = PIXI.Sprite.from(texture);
    this.sprite.anchor.set(0.5);
    this.sprite.x = Math.random() * 500;
    this.sprite.y = Math.random() * 500;

    app.stage.addChild(this.sprite);
  }

  move(dx: number, dy: number) {
    this.sprite.x += dx * 5;
    this.sprite.y += dy * 5;

    this.sprite.x = Math.max(0, Math.min(500, this.sprite.x));
    this.sprite.y = Math.max(0, Math.min(500, this.sprite.y));
  }

  rotate(direction: number) {
    this.sprite.rotation += direction * 0.1;
  }

  fire() {
    for (let i = 0; i < this.bulletCount; i++) {
      const bullet = new Bullet(this.app, this.sprite.x, this.sprite.y, this.sprite.rotation, this.damage);
      this.bullets.push(bullet);
      this.app.stage.addChild(bullet.sprite);
    }
  }

  update() {
    this.bullets.forEach(bullet => bullet.update());
    this.bullets = this.bullets.filter(bullet => bullet.isAlive);
  }
}
