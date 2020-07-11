class Ray {
  constructor(pos, angle) {
    this.position = pos;
    this.direction = p5.Vector.fromAngle(angle);
  }

  lookAt(x, y) {
    this.direction.x = x - this.position.x;
    this.direction.y = y - this.position.y;
    this.direction.normalize();
  }

  show() {
    stroke(255, 255, 170);
    push();
    translate(this.position.x, this.position.y);
    line(0, 0, this.direction.x * 10, this.direction.y * 10);
    pop();
  }

  // line-line intersection
  cast(wall) {
    const x1 = wall.pointA.x;
    const y1 = wall.pointA.y;
    const x2 = wall.pointB.x;
    const y2 = wall.pointB.y;

    const x3 = this.position.x;
    const y3 = this.position.y;
    const x4 = this.position.x + this.direction.x;
    const y4 = this.position.y + this.direction.y;

    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if(denominator == 0){
      return;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

    if(t > 0 && t < 1 && u > 0) {
      const point = createVector();
      point.x = x1 + t * (x2 - x1);
      point.y = y1 + t * (y2 - y1);
      return point;
    } else {
      return;
    }
  }
}