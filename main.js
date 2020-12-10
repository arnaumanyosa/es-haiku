(() => {

  const ARTICLE_MASC = 'article_masc';
  const ARTICLE_FEM = 'article_fem';
  const SUBSTANTIVE_MASC = 'substantive_masc';
  const SUBSTANTIVE_FEM = 'substantive_fem';
  const VERB = 'verb';
  const ADJECTIVE = 'adjective';

  const TEMPLATES = [
    // [ARTICLE_MASC, SUBSTANTIVE_MASC],
    // [ARTICLE_FEM, SUBSTANTIVE_FEM],
    [ARTICLE_MASC, SUBSTANTIVE_MASC,VERB],
    [ARTICLE_FEM, SUBSTANTIVE_FEM,VERB],
    [ARTICLE_MASC, SUBSTANTIVE_MASC,ADJECTIVE],
    [ARTICLE_FEM, SUBSTANTIVE_FEM,ADJECTIVE],
    // [SUBSTANTIVE_MASC,ADJECTIVE],
    // [SUBSTANTIVE_FEM,ADJECTIVE],
    [VERB, ARTICLE_MASC, SUBSTANTIVE_MASC],
    [VERB, ARTICLE_FEM, SUBSTANTIVE_FEM],
    [VERB, 'al más', SUBSTANTIVE_MASC],
    [VERB, 'al más', SUBSTANTIVE_FEM],
    ['sobre el', SUBSTANTIVE_MASC, ADJECTIVE],
    ['sobre la', SUBSTANTIVE_FEM, ADJECTIVE],
    ['en el', SUBSTANTIVE_MASC, ADJECTIVE],
    ['en la', SUBSTANTIVE_FEM, ADJECTIVE],
    ['en un', SUBSTANTIVE_MASC, ADJECTIVE],
    ['en una', SUBSTANTIVE_FEM, ADJECTIVE],
    ['entre un', SUBSTANTIVE_MASC, ADJECTIVE],
    ['entre una', SUBSTANTIVE_FEM, ADJECTIVE],
  ];

const wordsSpanish = {
  [ARTICLE_MASC]: [
    ['el', 'un'],
    ['este'],
  ],
  [ARTICLE_FEM]: [
    ['la'],
    ['una', 'esta']
  ],
  [SUBSTANTIVE_MASC]: [
    ['sol', 'pez', 'mar', 'rey', 'tren', 'pan', 'gen', 'fin'],
    ['mundo','ruido', 'aire', 'agua', 'color', 'bosque','viento', 'pino','cielo', 'arbol', 'todo', 'hijo','amor','beso','eco'],
    ['poema','caballo','martillo','planeta','castillo','refugio'],
    ['bullicio'],
    ['razonamiento']
  ],
  [SUBSTANTIVE_FEM]: [
    ['luz','flor','ley', 'faz', 'fe', 'cruz'],
    ['noche', 'luna', 'roca','nada', 'hija','reina','hoja','mano', 'piel', 'alma', 'balsa'],
    ['sonrisa','lagrima','paciencia','ciencia','regencia','montaña', 'estrella','música','doncella'],
    ['luciérnaga','primavera','mariposa','evolución','felicidad','esperanza','vitalidad'],
    ['fotografía','creatividad']
  ],
  [VERB]: [
    ['da', 've', 'va'],
    ['canta', 'sigue', 'crece', 'ama','oye','siente','habla','huye','fluye','ríe','tiembla','corta','sube'],
    ['golpea', 'renace', 'muere','recuerda','escucha','escribe','bosteza','levanta','apaga'],
    ['desespera','empieza','prefiere','reconoce','entrecruza'],
    ['revolotea'],
  ],
  [ADJECTIVE]: [
    ['gris', 'fiel', 'zen'],
    ['breve','feliz','voraz','cruel','libre','cerca','pobre', 'triste','simple','dulce','dócil','azul','verde','real'],
    ['brillante','natural','especial','fuerte','valiente', 'estable','endeble','brillante','naranja','salvaje','descortes'],
    ['cambiante', 'diferente','saludable', 'decadente', 'variable', 'estridente','agradable'],
    ['contaminante','inteligente','sobresaliente','interesante','desagradable']
  ]
}

  const VERSE_SEPARATOR = '\r\n';

  const isAKnownType = (type) => {
    if(
      type.localeCompare(ARTICLE_FEM) === 0 ||
      type.localeCompare(ARTICLE_MASC) === 0 ||
      type.localeCompare(SUBSTANTIVE_FEM) === 0 ||
      type.localeCompare(SUBSTANTIVE_MASC) === 0 ||
      type.localeCompare(ADJECTIVE) === 0 ||
      type.localeCompare(VERB) === 0
      ) {
        return true;
      }
      else {
        return false
      }
  }

  //Get a random position of an array
  const getArrayRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

  //Get a random number within a range
  const getRandomNumWithinRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const verseCreator = (numSyllables, template) => {
    let syllablesCount = 0;
    let verse = '';

    template.forEach(type => {

      const maxWordSyllables = numSyllables - syllablesCount;

      if(maxWordSyllables > 0) {
        let word = '';
        if (isAKnownType(type)) {
          const maxSearchableSyallablesWord = Math.min(maxWordSyllables, wordsSpanish[type].length);
          const currentWordSyllables = getRandomNumWithinRange(1, maxSearchableSyallablesWord);
          word = getArrayRandomItem(wordsSpanish[type][currentWordSyllables - 1]);
          syllablesCount = syllablesCount + currentWordSyllables;

        } else {
          word = type;
          syllablesCount = syllablesCount + 3;
        }

        verse = `${verse} ${word}`;
      }
    });

    verse = verse.trim();
    //Capitalize first character
    verse = `${verse.charAt(0).toUpperCase()}${verse.slice(1)}`;
    return verse;
  }

  const haikuCreator = (numVerses) => {
    //Must contain a mandatory word, in this case 'Presencia', a spanish (substantive, fem, 3 syllables)
    //Randomly decide where to add the mandatory word

    const verseLocationForMandatoryWord = getRandomNumWithinRange(0,numVerses-1);

    let haiku = '';

    for(let i = 0; i <numVerses; i++) {

      //for even verses, 5 syllables
      //odd verses, 7 syllables
      let numSyllables = i % 2 === true ?  7 : 5;

      if (i === verseLocationForMandatoryWord) {
        const mandatoryWord = 'presencia';
        const templatesForMandatoryWord = [
          [ARTICLE_FEM, mandatoryWord, VERB],
          [ARTICLE_FEM, mandatoryWord, ADJECTIVE],
        ]

        const template = getArrayRandomItem(templatesForMandatoryWord);
        haiku = `${haiku} ${verseCreator(numSyllables, template)} ${VERSE_SEPARATOR}`;

      } else {
        //Select random template
        const template = getArrayRandomItem(TEMPLATES)
        haiku = `${haiku} ${verseCreator(numSyllables, template)} ${VERSE_SEPARATOR}`;
      }
    }

    return haiku;
  }

  const finalHaiku = haikuCreator(3);

  console.log('HAIKU = ', finalHaiku);

  document.getElementById('haiku').innerHTML = finalHaiku;
})();
