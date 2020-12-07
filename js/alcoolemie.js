
window.addEventListener('load', function () {
    // tabEvents est une collection d'évenements
    let tabEvents = ['keyup', 'click'];

    // tabInputs est une collection de <input>
    let tabInputs = window.document.querySelectorAll('input[type="number"]');

    // Parcours de tabInputs en s'appuyant sur le nombre de <input> et sur tabEvents
    for (let i = 0; i < tabInputs.length; i++) {
        for (let j = 0; j < tabEvents.length; j++) {
            // Ajout d'un Listener sur tous les <input> sur les évènements listés dans tabEvents
            tabInputs[i].addEventListener(tabEvents[j], gestionAlcoolemie);
        }
    }

    // Gestion de l'input de type range (recopie de la valeur dans l'output)
    window.document.querySelector('#sexe input[type="radio"]:checked').addEventListener('change', function () {
        window.document.querySelector('#sexe input[type="radio"]:checked').value = getString('#sexe input[type="radio"]:checked');
        gestionAlcoolemie();
    });

});


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
  if (sexe === 'homme') {
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
  if (poids > 0) {
    return (getAlcoolPur(nbVerres) / (poids * getCoefDiffusion(sexe))).toFixed(2);
  } else {
    return 0;
  }

}

/**
 * Fonction qui retourne l'amende risquée en fontion de l'alcoolémie de la personne
 * 
 * @param {int} alcoolemie
 * @returns {String}
 */
function getAmende(alcoolemie) {
  const seuil = 0.8;
  const seuilMin = 0.5;
  if(alcoolemie <seuilMin){
    return 'Pas d\'amende';
  } else if ( alcoolemie < seuil) {
    return 'Minoree : 90 euros / Forfaitaire : 135 euros / Majoree : 375 euros';
  } else {
    return '4500 euros';
  }
}


/**
 * Fonction qui retourne la sanction encourue en fonction de l'alcoolémie
 * 
 * @param {float} alcoolemie
 * @returns {String}
 */
function getSanction(alcoolemie) {
  const seuil = 0.8;const seuilMin = 0.5;
  if(alcoolemie <seuilMin){
    return 'Pas de sanction';
  } else if ( alcoolemie < seuil) {
    return '6 points + suspension 3 ans';
  } else {
    return '6 points + 2 ans de prison + suspension 3 ans + stage de sensibilisation';
  }
}


/**
 * Fonction qui retourne une valeur entière récupérée via
 * window.document.querySelector(id)
 *
 * @param {string} id
 * @returns {integer}
 */
function getInt(id) {
  let valeur = parseInt(getString(id));
  if (isNaN(valeur)) {
    window.document.querySelector(id).value = 0;
    return 0;
  } else {
    return valeur;
  }
}

/**
 * Fonction qui retourne un string récupéré dans un champ via son id
 *
 * @param {string} id
 * @returns {string}
 */
function getString(id) {
  return window.document.querySelector(id).value;
}

function gestionAlcoolemie() {
  const sexe = getString('#sexe input[type="radio"]:checked');
  const poids = getInt('#num_poids');
  const verres = getInt('#num_verre');
  const alcoolemie = getAlcoolemie(sexe, poids, verres);
  let alH3 = window.document.querySelector('#alcoolemie');
  let amH3 = window.document.querySelector('#amende');
  let saH3 = window.document.querySelector('#sanction');
  /* utilisation de #remuneration au lieu de #prime pour réutiliser les règles
   * CSS définie dans simulateur.css
   * Si #remuneration (<h3 id='alcoolemie'></h3>) n'existe pas, on le créé */
  if (!alH3) {
    alH3 = window.document.createElement('h3');
    alH3.id = 'alcoolemie';
    window.document.querySelector('#recueilinfos').appendChild(alH3);
  }
  if (!amH3) {
    amH3 = window.document.createElement('h3');
    amH3.id = 'amende';
    window.document.querySelector('#recueilinfos').appendChild(amH3);
  }
  if (!saH3) {
    saH3 = window.document.createElement('h3');
    saH3.id = 'sanction';
    window.document.querySelector('#recueilinfos').appendChild(saH3);
  }
  alH3.innerHTML = alcoolemie + 'g/l de sang';
  amH3.innerHTML = getAmende(alcoolemie);
  saH3.innerHTML = getSanction(alcoolemie);
}