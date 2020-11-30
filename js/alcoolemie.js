

/**
 * Fonction qui retourne l'alcool pur ingéré en fonction du nombre
 * de verres
 * 
 * @param {int} nbVerres
 * @returns {int} 
 */

function getAlcoolPur(nbVerres) {
  const uniteAlcool = 10;
 return nbVerres * uniteAlcool;
}

/**
* Fonction qui retourne le coefficient de diffusion en fonction du sexe
*
* @param {string} sexe
* @returns {float}
*/
function getCoefDiffusion(sexe) {
 const coefDiffuH = 0.7, coefDiffuF = 0.6;
 if (sexe === 'M') {
 return coefDiffuH;
 } else {
 return coefDiffuF;
 }
}

/**
 * Fonction qui retourne l'alcoolémie d'une personne selon son sexe, son poids
 * et le nombre de verres
 * 
 * 
 * @param {string} sexe
 * @param {int} poids
 * @param {int} nbVerres
 * @returns {int}
 */
function getAlcoolemie(sexe, poids, nbVerres) {
  if(poids>0){
 return (getAlcoolPur(nbVerres) / (poids * getCoefDiffusion(sexe))).toFixed(2);
  } else{
    return 0;
  }
  
}

