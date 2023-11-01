import tx1 from "./textures/2k_mercury.jpg";
import tx2 from "./textures/2k_venus.jpg";
import tx3 from "./textures/2k_earth.jpg";
import tx4 from "./textures/2k_mars.jpg";
import tx5 from "./textures/2k_jupiter.jpg";
import tx6 from "./textures/2k_saturn.jpg";
import tx7 from "./textures/2k_uranus.jpg";
import tx8 from "./textures/2k_neptune.jpg";

const random = (a, b) => a + Math.random() * b;
const randomInt = (a, b) => Math.floor(random(a, b));
const randomColor = () =>
  `rgb(${randomInt(80, 50)}, ${randomInt(80, 50)}, ${randomInt(80, 50)})`;

const names = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
const textures = [tx1, tx2, tx3, tx4, tx5, tx6, tx7, tx8];
const sizes = [0.4, 0.9, 1, 0.5, 11.2, 9.4, 4.0, 3.9];
const xRadiuss = [0.38, 0.72, 1, 1.52, 5.20, 9.58, 19.14, 30.20];
// const revolutionSpeeds = [47.4, 35, 29.8, 24.1, 13.1, 9.7, 6.8, 5.4];
const revolutionSpeeds = [1/87.9691, 1/224.7, 1/365, 1/686.971, 1/4332.59, 1/10759.22, 1/30688.5, 1/60182];
const rotationSpeeds = [1/58.6, 1/243.0158, 1, 1/1.0259, 1/0.413, 1/0.44, 1/0.7183, 1/0.6713];
const planetData = [];
const totalPlanets = 8;
export const scale = 0.0000001;
const size_planet =  100;
const ratio_time = 5;

for (let index = 0; index < totalPlanets; index++) {
  planetData.push({
    id: index,
    color: randomColor(),
    name: names[index],
    xRadius: xRadiuss[index]*149597870.7*scale,
    zRadius: xRadiuss[index]*149597870.7*scale,
    size: sizes[index]*6378*scale*size_planet,
    speed: revolutionSpeeds[index]*50*ratio_time,
    offset: random(0, Math.PI * 2),
    rotationSpeed: rotationSpeeds[index]*0.85*ratio_time,
    textureMap: textures[index],

  });
}

export default planetData;