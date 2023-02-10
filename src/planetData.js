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

const textures = [tx1, tx2, tx3, tx4, tx5, tx6, tx7, tx8];
const sizes = [0.4, 0.9, 1, 0.5, 11.2, 9.4, 4.0, 3.9];
const xRadiuss = [0.0129, 0.0239, 0.0332, 0.0505, 0.1724, 0.3162, 0.6382, 1.000];
const planetData = [];
const totalPlanets = 8;
for (let index = 0; index < totalPlanets; index++) {
  planetData.push({
    id: index,
    color: randomColor(),
    xRadius: xRadiuss[index]*200,
    zRadius: xRadiuss[index]*200,
    // xRadius: (index + 2.5) * 4,
    // zRadius: (index + 2.5) * 2,
    size: sizes[index]*0.4,
    speed: random(0.02, 0.1),
    offset: random(0, Math.PI * 2),
    rotationSpeed: random(0.01, 0.03),
    textureMap: textures[index],

  });
}

export default planetData;