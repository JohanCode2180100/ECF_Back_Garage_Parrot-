//reponse type pour les points de terminaison

exports.success = (message, data) => {
  return { message, data };
};

exports.getUniqueId = (cars) => {
  //map permet de faire comme une boucle for en retournant un new array
  const carsId = cars.map((car) => car.id);
  //reduce permet de comparer les éléments 2 à 2 dans un array
  const maxId = carsId.reduce((a, b) => Math.max(a, b));
  const uniqueId = maxId + 1;
  return uniqueId;
};
