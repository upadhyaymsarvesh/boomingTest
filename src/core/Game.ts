import * as PIXI from 'pixi.js';
import { Tank } from './Tank';
import { Hay } from './Hay';
import { Wall } from './Wall';

export class Game {
    private static instance: Game;
    private app: PIXI.Application;
    private tanks: Tank[] = [];
    private currentTankIndex: number = 0;
    private hayBlocks: Hay[] = [];
    private walls: Wall[] = [];
    private isGameRunning: boolean = false;
  
    private constructor() {
      this.app = new PIXI.Application({ width: 500, height: 500 });
      document.body.appendChild(this.app.view);
  
      this.setup();
      this.gameLoop();
    }
  
    public static getInstance(): Game {
      if (!Game.instance) {
        Game.instance = new Game();
      }
      return Game.instance;
    }
  
    private setup() {
      this.createTanks();
      this.createObstacles();
      this.registerKeyHandlers();
      this.isGameRunning = true;
    }
  
    private createTanks() {
        const redTank = new Tank(this.app, 'assets/tankRed.png', 10, 2);
        const blueTank = new Tank(this.app, 'assets/tankBlue.png', 20, 3);
        const greenTank = new Tank(this.app, 'assets/tankGreen.png', 25, 1);
  
      this.tanks.push(redTank, blueTank, greenTank);
      this.showCurrentTank();
    }
  
    private createObstacles() {
      // Create walls
      for (let i = 0; i < 50; i++) {
        let x = Math.random() * 500;
        let y = Math.random() * 500;
        
        // Check for overlap with existing walls, hays, and tanks
        while (this.isOverlap(x, y, [...this.walls.map(wall => wall.sprite), ...this.hayBlocks.map(hay => hay.sprite), ...this.tanks.map(tank => tank.sprite)])) {
          x = Math.random() * 500;
          y = Math.random() * 500;
        }
        
        const wall = new Wall(this.app, x, y);
        this.walls.push(wall);
      }
  
      // Create hays
      for (let i = 0; i < 25; i++) {
        let x = Math.random() * 500;
        let y = Math.random() * 500;
        
        // Check for overlap with existing walls, hays, and tanks
        while (this.isOverlap(x, y, [...this.walls.map(wall => wall.sprite), ...this.hayBlocks.map(hay => hay.sprite), ...this.tanks.map(tank => tank.sprite)])) {
          x = Math.random() * 500;
          y = Math.random() * 500;
        }
        
        const hay = new Hay(this.app, x, y);
        this.hayBlocks.push(hay);
      }
    }
  
    private registerKeyHandlers() {
      window.addEventListener('keydown', (e) => {
        if (this.isGameRunning) {
          switch (e.code) {
            case 'ArrowUp':
              this.tanks[this.currentTankIndex].move(0, -1);
              break;
            case 'ArrowDown':
              this.tanks[this.currentTankIndex].move(0, 1);
              break;
            case 'ArrowLeft':
              this.tanks[this.currentTankIndex].rotate(-1);
              break;
            case 'ArrowRight':
              this.tanks[this.currentTankIndex].rotate(1);
              break;
            case 'Space':
              this.tanks[this.currentTankIndex].fire();
              break;
            case 'KeyT':
              this.switchTank();
              break;
          }
        }
      });
    }
  
    private switchTank() {
      this.currentTankIndex = (this.currentTankIndex + 1) % this.tanks.length;
      this.showCurrentTank();
    }
  
    private showCurrentTank() {
      this.tanks.forEach((tank, index) => {
        tank.sprite.visible = index === this.currentTankIndex;
      });
    }
  
    private gameLoop() {
      this.app.ticker.add(() => {
        if (this.isGameRunning) {
          this.tanks.forEach(tank => tank.update());
          this.checkCollisions();
        }
      });
    }
  
    private checkCollisions() {
        this.tanks.forEach(tank => {
          tank.bullets.forEach(bullet => {
            this.hayBlocks.forEach(hay => {
              if (hay.sprite && bullet.sprite && this.hitTestRectangle(bullet.sprite, hay.sprite)) {
                hay.takeDamage(bullet.damage);
                bullet.destroy();
              }
            });
          });
        });
    }
    
  
    private hitTestRectangle(r1: PIXI.Sprite, r2: PIXI.Sprite) {
        if (!r1 || !r2) {
            console.error('r1:', r1, 'r2:', r2); // Add logging to see which object is null
            return false;
        }
    
        const bounds1 = r1.getBounds();
        const bounds2 = r2.getBounds();
    
        return bounds1.x < bounds2.x + bounds2.width &&
               bounds1.x + bounds1.width > bounds2.x &&
               bounds1.y < bounds2.y + bounds2.height &&
               bounds1.y + bounds1.height > bounds2.y;
    }
    
  
    private isOverlap(x: number, y: number, objects: PIXI.Sprite[]): boolean {
      for (const obj of objects) {
          const bounds = obj.getBounds();
          if (x > bounds.x - 35 && x < bounds.x + bounds.width + 35 &&
              y > bounds.y - 35 && y < bounds.y + bounds.height + 35) {
              return true;
          }
      }
      return false;
    }
  }
  
  Game.getInstance();
