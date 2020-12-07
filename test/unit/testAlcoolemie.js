/**
 * Tests unitaires du projet Alcoolémie
 * pour la partie back 
 * 
 */
MesTestsUnitaires = TestCase('AlcoolemieTest');
MesTestsUnitaires.prototype.testGetAlcoolPur = function () {
  assertEquals('0 verre', 0, getAlcoolPur(0));
  assertEquals('1 verre', 10, getAlcoolPur(1));
}

MesTestsUnitaires.prototype.testGetCoefDiffusion = function () {
  assertEquals('Homme', 0.7, getCoefDiffusion('M'));
  assertEquals('Femme', 0.6, getCoefDiffusion('F'));
}

MesTestsUnitaires.prototype.testsGetAlcoolemie = function () {
  assertEquals('Homme 100 kg 1 verre', 0.14, getAlcoolemie('M', 100, 1));
  assertEquals('Femme 100 kg 1 verre', 0.17, getAlcoolemie('F', 100, 1));
};

MesTestsUnitaires.prototype.testsGetAmende = function () {
  assertEquals('Moins de 0,8 g/l de sang', 'Minoree : 90 euros / Forfaitaire : 135 euros / ' +
          'Majoree : 375 euros', getAmende(0.4));
  assertEquals('A partir de 0,8 g/l', '4500 euros', getAmende(0.8));
};

MesTestsUnitaires.prototype.testsGetSanction = function () {
  assertEquals('Moins de 0,8 g/l de sang', '6 points + suspension 3 ans',
          getSanction(0.4));
  assertEquals('A partir de 0,8 g/l de sang', '6 points + 2 ans de prison + suspension ' +
          '3 ans + stage de sensibilisation', getSanction(0.8));
};

/**
 * Tests unitaires du projet Alcoolémie
 * pour la partie graphique
 * 
 */
MesTestsUnitaires.prototype.testsGetInt = function () {
  /*:DOC +=
   <input type="number" id="num_verre" value="1">
   <input type="number" id="num_poids" value="100">
   */
  assertTrue('Test poids 100 Kg', 100 === getInt('#num_poids'));
  assertTrue('Test 1 verre', 1 === getInt('#num_verre'));
  window.document.querySelector('#num_verre').value = 'texte';
  assertTrue('Test erreur saisie verre', 0 === getInt('#num_verre'));
};


MesTestsUnitaires.prototype.testsGetString = function () {
  /*:DOC +=
   <fieldset id="sexe">
   <input type="radio" name="rd_sexe" id="rd_sexehomme" value="homme"
   checked="checked">
   <input type="radio" name="rd_sexe" id="rd_sexefemme" value="femme">
   </fieldset>
   */
  assertTrue('Test bouton radio Homme',
          'homme' === getString('#sexe input[type="radio"]:checked'));
  // Changement de sexe
  window.document.querySelector('#rd_sexehomme').removeAttribute('checked');
  window.document.querySelector('#rd_sexefemme').setAttribute('checked', 'checked');
  assertTrue('Test bouton radio Femme',
          'femme' === getString('#sexe input[type="radio"]:checked'));
};


MesTestsUnitaires.prototype.testsGestionAlcoolemie = function () {
  /*:DOC +=
   <input type="number" id="num_verre" value="1">
   <input type="number" id="num_poids" value="100">
  <fieldset id="sexe">
   <input type="radio" name="rd_sexe" id="rd_sexehomme" value="homme"
   checked="checked">
   <input type="radio" name="rd_sexe" id="rd_sexefemme" value="femme">
   </fieldset>
  <h3 id="alcoolemie" value="0.57 g/l de sang"></h3>
  <h3 id="amende" value="Minoree : 90 euros / Forfaitaire : 135 euros / Majoree : 375 euros"></h3>
  <h3 id="sanction" value ="6 points + suspension 3 ans"></h3>
   */
  assertTrue('Test gestionAlcoolemie', '0.57g/l de sang' === get('#alcoolemie'));
  assertTrue('Test gestionAlcoolemie', 'Minoree : 90 euros / Forfaitaire : 135 euros / Majoree : 375 euros' === getString('#amende'));
  assertTrue('Test gestionAlcoolemie', '6 points + suspension 3 ans' === getString('#sanction'));
};