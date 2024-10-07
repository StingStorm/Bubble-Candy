import orangeCannonball from '/assets/img/candy-cannon/orange-cannonball.png';
import greenCannonball from '/assets/img/candy-cannon/green-cannonball.png';
import brownCannonball from '/assets/img/candy-cannon/brown-cannonball.png';
import pinkCannonball from '/assets/img/candy-cannon/pink-cannonball.png';
import blueCannonball from '/assets/img/candy-cannon/blue-cannonball.png';
import { CannonController } from './cannonController';

const cannonballs = [
  orangeCannonball,
  greenCannonball,
  brownCannonball,
  pinkCannonball,
  blueCannonball,
];

const cannon = document.querySelector('.cannon');
const cannonBall = document.querySelector('.cannonball');

const cannonController = new CannonController(cannon, cannonBall);

// const cannonballBox = document.querySelector('.cannonball');

// cannon.addEventListener('click', randomCannoball);

// function randomCannoball() {
//   const randomIndex = Math.floor(Math.random() * cannonballs.length);

//   cannonballBox.innerHTML = `<img
//           src="${cannonballs[randomIndex]}"
//           alt="Cannonball"
//         />`;

//   cannonballBox.classList.remove('animation');

//   setTimeout(() => {
//     cannonballBox.classList.add('animation');
//   }, 10);

//   if (cannon.hasAttribute('data-clickMe')) {
//     cannon.removeAttribute('data-clickMe');
//   }
// }
