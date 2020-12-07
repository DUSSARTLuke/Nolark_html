/**
 * Tests unitaires du projet Alcoolémie
 * 
 * 
 */
MesTestsUnitaires = TestCase('AlcoolemieTest');
MesTestsUnitaires.prototype.testGetAlcoolPur = function(){
  assertEquals('0 verre', 0, getAlcoolPur(0));
  assertEquals('1 verre', 10, getAlcoolPur(1));
}

MesTestsUnitaires.prototype.testGetCoefDiffusion = function(){
  assertEquals('Homme', 0.7, getCoefDiffusion('M'));
  assertEquals('Femme', 0.6, getCoefDiffusion('F'));
}

MesTestsUnitaires.prototype.testsGetAlcoolemie = function() {
 assertEquals('Homme 100 kg 1 verre', 0.14, getAlcoolemie('M', 100, 1));
 assertEquals('Femme 100 kg 1 verre', 0.17, getAlcoolemie('F', 100, 1));
};

MesTestsUnitaires.prototype.testsGetAmende = function() {
 assertEquals('Moins de 0,8 g/l de sang', 'Minoree : 90 euros / Forfaitaire : 135 euros / '+
'Majoree : 375 euros', getAmende(0.4));
 assertEquals('A partir de 0,8 g/l', '4500 euros', getAmende(0.8));
};

MesTestsUnitaires.prototype.testsGetSanction = function() {
 assertEquals('Moins de 0,8 g/l de sang', '6 points + suspension 3 ans',
getSanction(0.4));
 assertEquals('A partir de 0,8 g/l de sang', '6 points + 2 ans de prison + suspension ' +
'3 ans + stage de sensibilisation', getSanction(0.8));
};