import orangeCannonball from '/assets/img/candy-cannon/orange-cannonball.png';
import greenCannonball from '/assets/img/candy-cannon/green-cannonball.png';
import brownCannonball from '/assets/img/candy-cannon/brown-cannonball.png';
import pinkCannonball from '/assets/img/candy-cannon/pink-cannonball.png';
import blueCannonball from '/assets/img/candy-cannon/blue-cannonball.png';
import { CannonController } from './cannonController';
import { throttle } from 'throttle-debounce';

const cannonballVariants = [
  orangeCannonball,
  greenCannonball,
  brownCannonball,
  pinkCannonball,
  blueCannonball,
];

const cannon = document.querySelector('.cannon');
const cannonBall = document.querySelector('.cannonball');

new CannonController(cannon, cannonBall, cannonballVariants);
//   if (cannon.hasAttribute('data-clickMe')) {
//     cannon.removeAttribute('data-clickMe');
//   }

throttle;
