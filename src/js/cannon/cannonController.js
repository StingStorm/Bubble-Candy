import { throttle } from 'throttle-debounce';

export class CannonController {
  static instance;
  cannonElement;
  cannonballElement;
  cannonballVariants = [];
  observer = new IntersectionObserver(this.#handleVisibilityChange.bind(this), {
    threshold: 0.1,
  });

  constructor(cannonElement, cannonballElement, cannonballVariants) {
    if (CannonController.instance) {
      return CannonController.instance;
    }

    this.cannonElement = cannonElement;
    this.cannonballElement = cannonballElement;
    this.cannonballVariants = [...cannonballVariants];
    this.observer.observe(this.cannonElement);

    this.cannonballElement.style.backgroundImage = `url(${
      this.cannonballVariants[this.#getRandomIndex()]
    })`;

    this.throttledShoot = throttle(100, this.shoot, { noTrailing: true });

    CannonController.instance = this;
  }

  startTraking() {
    document.addEventListener('mousemove', this.#rotateCannon);
    document.addEventListener('click', this.throttledShoot);
  }

  stopTraking() {
    document.removeEventListener('mousemove', this.#rotateCannon);
    document.removeEventListener('click', this.throttledShoot);
  }

  shoot = event => {
    const { rawAngle } = this.#calcAngle(event);

    if (rawAngle > 0) {
      return;
    }

    const angle = (rawAngle * Math.PI) / 180;

    const flyingCannonboll = this.#createFlyingCannonball(angle);
    const cannonballVariant = this.cannonballVariants[this.#getRandomIndex()];

    this.cannonballElement.style.backgroundImage = `url(${cannonballVariant})`;
    this.cannonballElement.classList.remove('animation');

    const distance = window.innerWidth / 2 - 200;
    const translateX = Math.cos(angle) * distance;
    const translateY = Math.sin(angle) * distance;

    requestAnimationFrame(() => {
      this.cannonballElement.classList.add('animation');
      flyingCannonboll.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });

    setTimeout(() => {
      flyingCannonboll.remove();
    }, 1000);
  };

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

  #createFlyingCannonball(angle) {
    const cannonCenterX =
      this.cannonElement.offsetLeft + this.cannonElement.offsetWidth / 2;
    const cannonCenterY =
      this.cannonElement.offsetTop + this.cannonElement.offsetHeight / 2;

    const bulletOffsetY = 163;
    const bulletX = cannonCenterX + Math.cos(angle) * bulletOffsetY;
    const bulletY = cannonCenterY + Math.sin(angle) * bulletOffsetY;

    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    document.body.appendChild(bullet);

    bullet.style.left = `${bulletX}px`;
    bullet.style.top = `${bulletY}px`;
    bullet.style.backgroundImage = this.cannonballElement.style.backgroundImage;

    return bullet;
  }

  #getRandomIndex() {
    return Math.floor(Math.random() * this.cannonballVariants.length);
  }
}
