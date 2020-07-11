class Particle {
  constructor() {
    this.position = createVector(width/2, height/2);
    this.rays = [];

    for(let angle=0; angle<360; angle++) {
      this.rays.push(new Ray(this.position, radians(angle)));
    }
  }

  update(x, y) {
    this.position.set(x, y);
  }

  look(wall) {
    for(let ray of this.rays) {
      let closest = null;
      let record = Infinity;

      for(let wall of walls) {
        const point = ray.cast(wall);

        if(point) {  
          const distance = p5.Vector.dist(this.position, point);

          if(distance < record) {
            record = distance;
            closest = point;
          }

          record = min(distance, record);
        }
      }

      if(closest) {
        stroke(255, 255, 180);
        line(this.position.x, this.position.y, closest.x, closest.y);
      }
    }
  }

  show() {
    fill(255);
    ellipse(this.position.x, this.position.y, 4);

    for(let ray of this.rays) {
      ray.show();
    }
  }
}