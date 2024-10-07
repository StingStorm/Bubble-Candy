export class CannonController {
  static instance;
  cannonElement;
  cannonBalls;
  observer = new IntersectionObserver(this.#handleVisibilityChange.bind(this), {
    threshold: 0,
  });

  constructor(cannonElement, cannonBalls) {
    if (CannonController.instance) {
      return CannonController.instance;
    }

    this.cannonElement = cannonElement;
    this.cannonBalls = cannonBalls;
    this.observer.observe(this.cannonElement);

    CannonController.instance = this;

    document.addEventListener('click', this.shoot.bind(this));
  }

  startTraking() {
    document.addEventListener('mousemove', this.#rotateCannon);
  }

  stopTraking() {
    document.removeEventListener('mousemove', this.#rotateCannon);
  }

  shoot(event) {
    const { rawAngle } = this.#calcAngle(event);

    const bulletX =
      this.cannonElement.offsetLeft + this.cannonElement.offsetWidth / 2;
    const bulletY =
      this.cannonElement.offsetTop + this.cannonElement.offsetHeight / 2;

    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    document.body.appendChild(bullet);

    bullet.style.left = `${bulletX}px`;
    bullet.style.top = `${bulletY}px`;

    const angle = (rawAngle * Math.PI) / 180;

    const distance = 900;
    const translateX = Math.cos(angle) * distance;
    const translateY = Math.sin(angle) * distance;

    setTimeout(() => {
      bullet.style.transform = `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px))`;
      bullet.classList.add('animated');
    }, 10);

    setTimeout(() => {
      bullet.remove();
    }, 1000);
  }

  //   shoot(event) {
  //     const { rawAngle } = this.#calcAngle(event);

  //     this.cannonBalls.style.left = `${this.cannonElement.offsetLeft}px`;
  //     this.cannonBalls.style.top = `${this.cannonElement.offsetTop}px`;

  //     const angle = (-90 * Math.PI) / 180;
  //     const speed = 500;
  //     const translateX = Math.cos(angle) * speed;
  //     const translateY = Math.sin(angle) * speed;

  //     console.log(Math.cos(angle), Math.sin(angle));

  //     this.cannonBalls.style.transform = `translate(${translateX}px, ${translateY}px)`;
  //   }

  #handleVisibilityChange(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.startTraking();
      } else {
        this.stopTraking();
      }
    });
  }

  #rotateCannon = event => {
    const { rawAngle, corretedAngle } = this.#calcAngle(event);
    if (rawAngle > 0) {
      return;
    }

    this.cannonElement.style.transform = `rotate(${corretedAngle}deg)`;
  };

  #calcAngle(event) {
    const cannonRect = this.cannonElement.getBoundingClientRect();
    const cannonCenterX = cannonRect.left + cannonRect.width / 2;
    const cannonCenterY = cannonRect.top + cannonRect.height / 2;

    const diffX = event.clientX - cannonCenterX;
    const diffY = event.clientY - cannonCenterY;

    const rawAngle = Math.atan2(diffY, diffX) * (180 / Math.PI);
    const corretedAngle = rawAngle + 90;

    return { rawAngle, corretedAngle };
  }
}
