import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from './firebase'

const AUTORES = [
  {
    id: 'socrates',
    nombre: 'Sócrates',
    periodo: 'Antigüedad',
    anioNacimiento: '470 a.C.',
    anioMuerte: '399 a.C.',
    ordenCronologico: 1,
    bio: 'Sócrates (470–399 a.C.) fue un filósofo ateniense considerado el padre de la filosofía occidental. A diferencia de sus contemporáneos sofistas, no cobró por sus enseñanzas ni escribió nada: todo lo que sabemos de él proviene de los relatos de sus discípulos, especialmente Platón y Jenofonte. Dedicó su vida a interrogar a sus conciudadanos sobre nociones como la justicia, la virtud y el conocimiento, convencido de que la vida sin reflexión no merece ser vivida. Fue condenado a muerte por un tribunal ateniense bajo los cargos de impiedad y corrupción de la juventud, y bebió la cicuta con una serenidad que se convirtió en ejemplo de integridad filosófica. Su método de preguntas y respuestas —la mayéutica— sigue siendo uno de los modelos pedagógicos más influyentes de la historia.',
  },
  {
    id: 'platon',
    nombre: 'Platón',
    periodo: 'Antigüedad',
    anioNacimiento: '427 a.C.',
    anioMuerte: '347 a.C.',
    ordenCronologico: 2,
    bio: 'Platón (427–347 a.C.) fue discípulo de Sócrates y fundador de la Academia de Atenas, la primera institución de educación superior de Occidente. Es autor de una serie de diálogos filosóficos —entre ellos La República, El banquete, Fedón y Fedro— en los que Sócrates aparece como personaje principal. Su contribución más original es la Teoría de las Ideas: la afirmación de que existe un mundo inteligible de formas perfectas e inmutables, del que el mundo sensible no es más que una copia imperfecta. Para Platón, el conocimiento verdadero consiste en la contemplación de esas Ideas, y la educación filosófica es el proceso de ascenso desde las sombras de la caverna hacia la luz del conocimiento.',
  },
  {
    id: 'aristoteles',
    nombre: 'Aristóteles',
    periodo: 'Antigüedad',
    anioNacimiento: '384 a.C.',
    anioMuerte: '322 a.C.',
    ordenCronologico: 3,
    bio: 'Aristóteles (384–322 a.C.) fue discípulo de Platón durante veinte años en la Academia, y luego fundó su propia escuela, el Liceo. A diferencia de su maestro, concebía la filosofía como una empresa fundamentalmente empírica: el conocimiento comienza en la observación del mundo sensible. Su obra es enciclopédica: abarca lógica, biología, física, metafísica, ética, política, retórica y poética. Fue tutor del joven Alejandro Magno. En ética, es famoso por su concepto de eudaimonía (felicidad como florecimiento) y su doctrina del término medio. En política, sostuvo que el ser humano es por naturaleza un "animal político" que solo puede realizarse plenamente en el seno de una comunidad organizada.',
  },
  {
    id: 'descartes',
    nombre: 'Descartes',
    periodo: 'Moderna',
    anioNacimiento: '1596',
    anioMuerte: '1650',
    ordenCronologico: 1,
    bio: 'René Descartes (1596–1650) fue matemático y filósofo francés, considerado el padre de la filosofía moderna. Su obra más influyente, las Meditaciones Metafísicas (1641), inaugura el proyecto de fundar el conocimiento en la certeza absoluta del sujeto pensante. Su método de la duda sistemática y el descubrimiento del Cogito ("pienso, luego existo") marcan el giro hacia el sujeto que caracteriza la filosofía moderna. Descartes sostuvo una radical distinción entre mente (sustancia pensante) y cuerpo (sustancia material): este dualismo cartesiano sigue generando debates en filosofía de la mente. También fue uno de los fundadores de la geometría analítica.',
  },
  {
    id: 'kant',
    nombre: 'Kant',
    periodo: 'Moderna',
    anioNacimiento: '1724',
    anioMuerte: '1804',
    ordenCronologico: 2,
    bio: 'Immanuel Kant (1724–1804) nació, vivió y murió en Königsberg, sin haber viajado nunca a más de 200 km de su ciudad natal. Pese a ello, su influencia en la filosofía occidental es comparable a la de Platón o Aristóteles. Sus tres grandes Críticas representan un intento sistemático de delimitar las posibilidades y los límites del conocimiento humano, la moralidad y el juicio estético. Su "giro copernicano" en filosofía invierte la relación entre sujeto y objeto: no es el conocimiento el que se adapta a los objetos, sino que son los objetos los que se adaptan a las estructuras del sujeto cognoscente. En ética, desarrolló la noción del imperativo categórico como fundamento de la moral racional universal.',
  },
  {
    id: 'nietzsche',
    nombre: 'Nietzsche',
    periodo: 'Contemporánea',
    anioNacimiento: '1844',
    anioMuerte: '1900',
    ordenCronologico: 1,
    bio: 'Friedrich Nietzsche (1844–1900) fue filósofo y escritor alemán, uno de los pensadores más influyentes —y también más mal citados— del siglo XX. Su obra, escrita en un estilo literario y aforístico, incluye El nacimiento de la tragedia, Así habló Zaratustra, Más allá del bien y del mal y La genealogía de la moral. Sus principales intervenciones filosóficas giran en torno a la crítica de la moral cristiana, el anuncio de la "muerte de Dios" y la propuesta del superhombre como ideal de quien crea sus propios valores. Nietzsche sufrió un colapso mental en 1889 y pasó sus últimos once años en un estado de demencia. Su hermana manipuló su obra póstuma para asociarlo con el nacionalismo germánico, lo que contribuyó injustamente a vincularlo con el nazismo.',
  },
  {
    id: 'sartre',
    nombre: 'Sartre',
    periodo: 'Contemporánea',
    anioNacimiento: '1905',
    anioMuerte: '1980',
    ordenCronologico: 2,
    bio: 'Jean-Paul Sartre (1905–1980) fue filósofo, novelista y dramaturgo francés, y una de las figuras intelectuales más influyentes del siglo XX. Principal representante del existencialismo ateo, su obra filosófica central es El ser y la nada (1943). También escribió novelas (La náusea), teatro (A puerta cerrada) y ensayos políticos. Su compañera de vida fue Simone de Beauvoir. Sartre fue conocido por su compromiso político activo: participó en los eventos de Mayo del 68 y rechazó el Premio Nobel de Literatura en 1964 por coherencia con sus principios. Su tesis de que "la existencia precede a la esencia" tuvo un enorme impacto cultural más allá de los círculos académicos.',
  },
  {
    id: 'beauvoir',
    nombre: 'Simone de Beauvoir',
    periodo: 'Contemporánea',
    anioNacimiento: '1908',
    anioMuerte: '1986',
    ordenCronologico: 3,
    bio: 'Simone de Beauvoir (1908–1986) fue filósofa, novelista y ensayista francesa, figura central del existencialismo y del feminismo filosófico del siglo XX. Su obra El segundo sexo (1949) es uno de los textos fundacionales del feminismo contemporáneo: en él analiza la condición de la mujer como "el Otro" en la cultura occidental y argumenta que la feminidad es una construcción social, no una determinación biológica. Compañera de vida de Jean-Paul Sartre, también escribió novelas como Los mandarines (Premio Goncourt, 1954). Su influencia se extiende a los estudios de género, al feminismo de segunda ola y a la teoría queer contemporánea.',
  },
]

const RECURSOS = [
  // SÓCRATES
  {
    id: 'soc-01',
    tipo: 'texto',
    titulo: 'La ironía socrática — el conocimiento del no saber',
    autorId: 'socrates',
    temas: ['conocimiento', 'ética'],
    contenidoTexto: `El filósofo ateniense Sócrates no dejó escritos propios; su pensamiento nos llega a través de los diálogos de su discípulo Platón. La base de su método —conocido como mayéutica— era la ironía: Sócrates fingía ignorancia para llevar a su interlocutor a descubrir contradicciones en sus propias creencias.

"Sé que no sé nada" es la frase que mejor resume su postura epistemológica. Cuando el oráculo de Delfos declaró que nadie era más sabio que Sócrates, él interpretó esto no como un elogio a su conocimiento, sino como un reconocimiento de su conciencia sobre los límites del mismo. Los demás hombres creían saber; Sócrates sabía que no sabía.

Este punto de partida —la conciencia de la propia ignorancia— es, para Sócrates, el primer paso hacia la verdadera sabiduría. Solo quien reconoce que no sabe puede emprender genuinamente la búsqueda del conocimiento. La arrogancia intelectual, por el contrario, cierra las puertas del entendimiento.

El método socrático consiste en una serie de preguntas aparentemente simples que van revelando las contradicciones del pensamiento del interlocutor. No se trata de imponer ideas, sino de asistir al nacimiento de las ideas que el otro ya lleva dentro: de ahí el nombre de "mayéutica", tomado del oficio de su madre Fenaretes, que era partera.`,
    urlArchivo: '',
    urlEmbed: '',
    relacionados: ['plat-01'],
  },
  {
    id: 'soc-02',
    tipo: 'texto',
    titulo: 'La muerte de Sócrates — serenidad ante la cicuta',
    autorId: 'socrates',
    temas: ['muerte', 'felicidad', 'existencia'],
    contenidoTexto: `En el año 399 a.C., Sócrates fue condenado a muerte por un tribunal ateniense bajo los cargos de impiedad y corrupción de la juventud. Lejos de huir —sus amigos tenían los medios para asegurarlo—, eligió beber la cicuta y aceptar el veredicto.

El diálogo Fedón de Platón narra las últimas horas de Sócrates, quien pasa el tiempo discutiendo con sus discípulos sobre la inmortalidad del alma. Ante la consternación de quienes lo rodean, Sócrates mantiene una actitud de serenidad e incluso alegría.

"¿No es la práctica de la filosofía sino un entrenamiento para morir?" pregunta Sócrates. Para él, el filósofo pasa su vida liberando el alma de las distracciones del cuerpo: los placeres, los dolores, los apetitos. La muerte no es, entonces, algo que deba temerse, sino la liberación definitiva del alma.

Cuando el guardián le trae la copa con veneno, Sócrates la toma con calma, pronuncia una última plegaria a los dioses, y bebe. Murió rodeado de sus amigos, que lloraban; él, sin embargo, mantuvo la compostura hasta el final. La muerte de Sócrates se convirtió en uno de los relatos más poderosos sobre la integridad filosófica y moral.`,
    urlArchivo: '',
    urlEmbed: '',
    relacionados: ['niet-01'],
  },
  {
    id: 'soc-03',
    tipo: 'video',
    titulo: 'El método socrático — preguntas que transforman',
    autorId: 'socrates',
    temas: ['conocimiento'],
    contenidoTexto: '',
    urlArchivo: '',
    urlEmbed: 'https://www.youtube.com/embed/N3pGVRQKVAk',
    relacionados: [],
  },
  // PLATÓN
  {
    id: 'plat-01',
    tipo: 'texto',
    titulo: 'El mito de la caverna — de las sombras a la luz',
    autorId: 'platon',
    temas: ['conocimiento', 'libertad'],
    contenidoTexto: `En el Libro VII de La República, Platón nos propone uno de los más célebres ejercicios de imaginación filosófica: la alegoría de la caverna.

Imaginemos un grupo de personas encadenadas desde su nacimiento en el interior de una caverna, de cara a la pared del fondo. Detrás de ellos arde un fuego, y entre el fuego y los prisioneros hay personas que portan objetos. Las sombras de esos objetos se proyectan en la pared que los prisioneros miran. Para ellos, esas sombras son la única realidad que conocen.

Si uno de los prisioneros fuera liberado y obligado a mirar el fuego, al principio quedaría encandilado y confundido. Si lo arrastraran afuera de la caverna y lo expusieran a la luz del sol, al principio no podría ver nada. Poco a poco, sus ojos se adaptarían: primero vería reflejos en el agua, luego los objetos mismos, luego el cielo nocturno, y finalmente el sol.

Para Platón, la caverna representa el mundo de las apariencias y los sentidos; el exterior, el mundo de las Ideas verdaderas. El sol simboliza la Idea del Bien, la máxima verdad filosófica. El filósofo es quien ha salido de la caverna y puede contemplar la realidad en su plenitud.

El mito plantea además un problema político: si el filósofo regresa a la caverna para intentar iluminar a los demás prisioneros, estos —acostumbrados a las sombras— probablemente no lo creerán, y quizás hasta querrán matarlo. Una velada alusión al destino de Sócrates.`,
    urlArchivo: '',
    urlEmbed: '',
    relacionados: ['desc-01', 'soc-01'],
  },
  {
    id: 'plat-02',
    tipo: 'pdf',
    titulo: 'El Banquete — selección sobre el Amor y el Eros',
    autorId: 'platon',
    temas: ['amor', 'felicidad'],
    contenidoTexto: '',
    urlArchivo: 'https://drive.google.com/file/d/ejemplo-banquete/view',
    urlEmbed: '',
    relacionados: ['beau-01'],
  },
  {
    id: 'plat-03',
    tipo: 'video',
    titulo: 'Platón y la teoría de las Ideas — explicado para secundaria',
    autorId: 'platon',
    temas: ['conocimiento'],
    contenidoTexto: '',
    urlArchivo: '',
    urlEmbed: 'https://www.youtube.com/embed/1RWOpQXTltA',
    relacionados: ['plat-01'],
  },
  // ARISTÓTELES
  {
    id: 'arist-01',
    tipo: 'texto',
    titulo: 'La eudaimonía — la felicidad como florecimiento',
    autorId: 'aristoteles',
    temas: ['felicidad', 'ética'],
    contenidoTexto: `En la Ética Nicomáquea, Aristóteles se pregunta cuál es el bien supremo al que aspira la vida humana. Su respuesta es la eudaimonía, término griego que suele traducirse como "felicidad" o "florecimiento", aunque ninguna de estas traducciones captura del todo su sentido.

Para Aristóteles, la eudaimonía no es un estado de ánimo momentáneo ni una suma de placeres. Es una forma de vida: la actividad del alma conforme a la virtud. Somos felices en la medida en que ejercemos bien lo que nos es propio como seres humanos, y lo que nos es propio es la razón.

Aristóteles distingue dos tipos de virtudes: las éticas (como el coraje, la generosidad, la justicia) y las dianoéticas (intelectuales, como la prudencia y la sabiduría). Las virtudes éticas se adquieren por hábito: nadie nace valiente, sino que se hace valiente al practicar actos valientes repetidamente.

Un principio central de su ética es el del "término medio" (mesótes): la virtud se encuentra entre dos vicios opuestos. El coraje está entre la cobardía y la temeridad; la generosidad, entre la avaricia y el despilfarro. Encontrar ese punto medio no es mecánico —depende de las circunstancias— y requiere la virtud de la prudencia (phrónesis).

La felicidad aristotélica es, en definitiva, activa: no se trata de tener bienes, sino de usarlos bien. No es un fin que se alcanza de una vez, sino una forma de vivir que se practica día a día.`,
    urlArchivo: '',
    urlEmbed: '',
    relacionados: ['sart-01'],
  },
  {
    id: 'arist-02',
    tipo: 'pdf',
    titulo: 'Política — el ser humano como animal político',
    autorId: 'aristoteles',
    temas: ['ética', 'existencia'],
    contenidoTexto: '',
    urlArchivo: 'https://drive.google.com/file/d/ejemplo-politica/view',
    urlEmbed: '',
    relacionados: ['sart-01'],
  },
  {
    id: 'arist-03',
    tipo: 'tiktok',
    titulo: 'Aristóteles en 60 segundos: virtud y término medio',
    autorId: 'aristoteles',
    temas: ['ética', 'felicidad'],
    contenidoTexto: '',
    urlArchivo: '',
    urlEmbed: 'https://www.tiktok.com/embed/v2/7000000000000000001',
    relacionados: ['arist-01'],
  },
  // DESCARTES
  {
    id: 'desc-01',
    tipo: 'texto',
    titulo: 'Cogito ergo sum — la certeza del sujeto pensante',
    autorId: 'descartes',
    temas: ['conocimiento', 'existencia'],
    contenidoTexto: `En las Meditaciones Metafísicas (1641), René Descartes se propone un proyecto radicalmente crítico: demoler todos sus conocimientos previos y reconstruir el saber desde sus cimientos, aceptando únicamente aquello que sea absolutamente cierto.

Su método es la duda. Para encontrar algo indudable, Descartes decide dudar de todo lo que pueda ser dudado: los sentidos (que a veces nos engañan), el mundo exterior (quizás solo sea un sueño), incluso las verdades matemáticas (tal vez un "genio maligno" nos hace creer que 2 + 2 = 4 cuando en realidad no).

Pero hay algo que resiste esta duda radical: el propio acto de dudar. Para poder dudar, tengo que estar pensando; y si estoy pensando, existo. "Pienso, luego existo" (Cogito, ergo sum) es la primera certeza indudable.

Nótese que Descartes no dice "veo, luego existo" ni "siento, luego existo". La certeza surge del pensamiento: soy, ante todo, una cosa pensante (res cogitans). El cuerpo, la extensión, el mundo exterior: todo eso puede aún ser dudoso. Lo único absolutamente cierto es la existencia del yo pensante.

A partir de esta certeza, Descartes intentará reconstruir el conocimiento: probar la existencia de Dios como garantía contra el genio maligno, y luego la existencia del mundo material. El Cogito se ha convertido en el punto de partida de la filosofía moderna y en uno de los momentos más influyentes de la historia del pensamiento.`,
    urlArchivo: '',
    urlEmbed: '',
    relacionados: ['plat-01', 'kant-01'],
  },
  {
    id: 'desc-02',
    tipo: 'pdf',
    titulo: 'Discurso del Método — primera y segunda parte',
    autorId: 'descartes',
    temas: ['conocimiento'],
    contenidoTexto: '',
    urlArchivo: 'https://drive.google.com/file/d/ejemplo-discurso/view',
    urlEmbed: '',
    relacionados: ['desc-01'],
  },
  {
    id: 'desc-03',
    tipo: 'video',
    titulo: 'Descartes y la duda metódica — filosofía moderna',
    autorId: 'descartes',
    temas: ['conocimiento'],
    contenidoTexto: '',
    urlArchivo: '',
    urlEmbed: 'https://www.youtube.com/embed/CAjWUrwvxs4',
    relacionados: ['desc-01'],
  },
  // KANT
  {
    id: 'kant-01',
    tipo: 'texto',
    titulo: 'El imperativo categórico — ética del deber universal',
    autorId: 'kant',
    temas: ['ética', 'libertad'],
    contenidoTexto: `En la Fundamentación de la Metafísica de las Costumbres (1785), Immanuel Kant se propone encontrar el principio supremo de la moralidad: un criterio que permita distinguir acciones buenas de acciones malas de manera universal.

La respuesta de Kant es el imperativo categórico, que puede formularse de varias maneras. La más conocida es: "Obra solo según aquella máxima que puedas querer que se convierta en ley universal". Antes de actuar, pregúntate: ¿qué pasaría si todo el mundo actuara como yo en esta situación?

Por ejemplo, si alguien considera mentir para salir de una situación difícil, debe preguntarse: ¿qué pasaría si todos mintieran cuando les conviene? La práctica de la promesa dejaría de funcionar porque nadie creería en las palabras de nadie. La mentira se socabaría a sí misma como práctica universal. Por lo tanto, mentir es moralmente incorrecto.

Kant distingue el imperativo categórico del imperativo hipotético: "Si quieres X, haz Y". Los imperativos hipotéticos dependen de los fines que perseguimos. El imperativo categórico, en cambio, es incondicional: no dice "actúa así si quieres ser feliz", sino "actúa así, punto".

Una segunda formulación del imperativo dice: "Obra de tal modo que trates a la humanidad, tanto en tu persona como en la de cualquier otro, siempre como un fin y nunca meramente como un medio". Las personas tienen dignidad y no deben ser instrumentalizadas.

La ética kantiana es una ética del deber: lo moralmente relevante no es el resultado de nuestras acciones, sino la intención con la que actuamos y la conformidad de nuestra máxima con la ley moral.`,
    urlArchivo: '',
    urlEmbed: '',
    relacionados: ['beau-02'],
  },
  {
    id: 'kant-02',
    tipo: 'pdf',
    titulo: '¿Qué es la Ilustración? — Kant y la mayoría de edad de la razón',
    autorId: 'kant',
    temas: ['libertad', 'conocimiento'],
    contenidoTexto: '',
    urlArchivo: 'https://drive.google.com/file/d/ejemplo-ilustracion/view',
    urlEmbed: '',
    relacionados: ['kant-01'],
  },
  {
    id: 'kant-03',
    tipo: 'video',
    titulo: 'Kant para principiantes: ética, deber y dignidad',
    autorId: 'kant',
    temas: ['ética'],
    contenidoTexto: '',
    urlArchivo: '',
    urlEmbed: 'https://www.youtube.com/embed/xwOCmJevigw',
    relacionados: ['kant-01'],
  },
  // NIETZSCHE
  {
    id: 'niet-01',
    tipo: 'texto',
    titulo: 'Dios ha muerto — La Gaya Ciencia, aforismo 125',
    autorId: 'nietzsche',
    temas: ['muerte', 'existencia'],
    contenidoTexto: `En La Gaya Ciencia (1882), Nietzsche incluye uno de los pasajes más comentados de la filosofía moderna: el "aforismo del loco" (§125).

Un hombre irrumpe en el mercado con una linterna encendida en pleno mediodía, gritando que busca a Dios. La muchedumbre, que no cree en Dios, se burla de él. Entonces el loco los increpa: "¡Lo hemos matado, vosotros y yo! ¡Todos somos sus asesinos! [...] Dios ha muerto. Dios permanece muerto. Y nosotros lo hemos matado".

Nietzsche no celebra la muerte de Dios: la lamentación del loco es también un anuncio terrorífico. La muerte de Dios no es solo la pérdida de la fe religiosa; es el derrumbe de todo el sistema de valores que Occidente había construido durante siglos: la moral cristiana, la noción de verdad absoluta, el sentido del mundo.

¿Qué queda cuando Dios muere? Para Nietzsche, la respuesta no puede ser simplemente "nada": el nihilismo —la creencia de que todo carece de sentido— es el peligro que acecha. La tarea del pensamiento moderno es superar ese nihilismo y crear nuevos valores.

El loco concluye que ha llegado demasiado pronto: los hombres aún no son conscientes de lo que han hecho. "Este inmenso acontecimiento está todavía en camino y aún no ha llegado a los oídos de los hombres."`,
    urlArchivo: '',
    urlEmbed: '',
    relacionados: ['sart-01', 'soc-02'],
  },
  {
    id: 'niet-02',
    tipo: 'pdf',
    titulo: 'Así habló Zaratustra — Del superhombre y el eterno retorno',
    autorId: 'nietzsche',
    temas: ['libertad', 'existencia'],
    contenidoTexto: '',
    urlArchivo: 'https://drive.google.com/file/d/ejemplo-zaratustra/view',
    urlEmbed: '',
    relacionados: ['niet-01', 'sart-01'],
  },
  {
    id: 'niet-03',
    tipo: 'tiktok',
    titulo: 'Nietzsche y la voluntad de poder en 60 segundos',
    autorId: 'nietzsche',
    temas: ['existencia', 'libertad'],
    contenidoTexto: '',
    urlArchivo: '',
    urlEmbed: 'https://www.tiktok.com/embed/v2/7000000000000000002',
    relacionados: ['niet-01'],
  },
  // SARTRE
  {
    id: 'sart-01',
    tipo: 'texto',
    titulo: 'La existencia precede a la esencia — El existencialismo es un humanismo',
    autorId: 'sartre',
    temas: ['existencia', 'libertad'],
    contenidoTexto: `En la conferencia "El existencialismo es un humanismo" (1945), Jean-Paul Sartre expone de manera clara la tesis central del existencialismo ateo: la existencia precede a la esencia.

¿Qué significa esto? Si pienso en un objeto fabricado —digamos, un cortapapel—, el artesano que lo fabrica tiene en mente de antemano su esencia: para qué sirve, qué forma tendrá, cómo funcionará. La esencia precede a la existencia del objeto.

En la concepción teológica tradicional, lo mismo ocurre con el ser humano: Dios nos concibe antes de crearnos, según una idea o esencia que determina qué somos y para qué existimos. Pero si Dios no existe, dice Sartre, entonces el ser humano existe primero —aparece en el mundo— y solo después se define. No hay naturaleza humana predeterminada. No hay esencia que nos preceda.

Esto tiene una consecuencia radical: somos completamente libres. "El hombre está condenado a ser libre", escribe Sartre. No podemos refugiarnos en la naturaleza, en Dios, ni en ninguna esencia fija para explicar o excusar lo que somos. Somos lo que hacemos: nuestra existencia se construye a través de nuestras elecciones.

Pero esta libertad es inseparable de la responsabilidad. Cuando elegimos, no elegimos solo para nosotros: al elegir cierto modo de ser, estamos implícitamente afirmando que ese modo de ser tiene valor para todos. "Cuando elegimos, creamos una imagen del hombre que juzgamos que debe ser."`,
    urlArchivo: '',
    urlEmbed: '',
    relacionados: ['niet-01', 'beau-01'],
  },
  {
    id: 'sart-02',
    tipo: 'video',
    titulo: 'Sartre: libertad radical y responsabilidad existencial',
    autorId: 'sartre',
    temas: ['libertad', 'existencia'],
    contenidoTexto: '',
    urlArchivo: '',
    urlEmbed: 'https://www.youtube.com/embed/3bQsZxDQgzU',
    relacionados: ['sart-01'],
  },
  {
    id: 'sart-03',
    tipo: 'pdf',
    titulo: 'El ser y la nada — selección sobre la mala fe',
    autorId: 'sartre',
    temas: ['libertad', 'ética'],
    contenidoTexto: '',
    urlArchivo: 'https://drive.google.com/file/d/ejemplo-ser-nada/view',
    urlEmbed: '',
    relacionados: ['sart-01', 'beau-02'],
  },
  // BEAUVOIR
  {
    id: 'beau-01',
    tipo: 'texto',
    titulo: 'No se nace mujer — El segundo sexo',
    autorId: 'beauvoir',
    temas: ['existencia', 'libertad'],
    contenidoTexto: `La frase que abre el segundo volumen de El segundo sexo (1949) de Simone de Beauvoir es una de las más citadas del feminismo filosófico: "No se nace mujer: se llega a serlo."

Con esta afirmación, Beauvoir ataca la idea de que la feminidad es una esencia natural, algo dado biológicamente de una vez para siempre. La mujer no es mujer por naturaleza: se convierte en mujer a través de un proceso histórico, cultural y social de construcción de la identidad.

Beauvoir aplica el método existencialista sartreano al análisis de la condición femenina. Si no hay naturaleza humana predeterminada y somos lo que hacemos, ¿por qué las mujeres han quedado definidas históricamente por lo que no son —no son hombres— y por las funciones que cumplen?

El concepto clave de Beauvoir es el de la "Otredad". Históricamente, el hombre ha ocupado el lugar del Sujeto universal; la mujer ha quedado como el Otro, lo diferente, lo secundario. La mujer no se define desde sí misma sino en relación al hombre y en función de sus necesidades.

Esto no es un destino inevitable: si la feminidad es una construcción cultural, puede deconstruirse. El proyecto feminista, para Beauvoir, es que las mujeres puedan ser Sujetos de su propia existencia, no el Otro definido por otro.

El segundo sexo anticipa debates que solo décadas después se articularían plenamente en los estudios de género: la distinción entre sexo (biológico) y género (social), la performatividad de la identidad, la crítica del esencialismo.`,
    urlArchivo: '',
    urlEmbed: '',
    relacionados: ['sart-01', 'plat-02'],
  },
  {
    id: 'beau-02',
    tipo: 'pdf',
    titulo: 'La ética de la ambigüedad — libertad y responsabilidad',
    autorId: 'beauvoir',
    temas: ['ética', 'libertad'],
    contenidoTexto: '',
    urlArchivo: 'https://drive.google.com/file/d/ejemplo-etica-ambiguedad/view',
    urlEmbed: '',
    relacionados: ['kant-01', 'sart-03'],
  },
  {
    id: 'beau-03',
    tipo: 'tiktok',
    titulo: 'Beauvoir y el feminismo existencialista en 60 segundos',
    autorId: 'beauvoir',
    temas: ['existencia', 'amor'],
    contenidoTexto: '',
    urlArchivo: '',
    urlEmbed: 'https://www.tiktok.com/embed/v2/7000000000000000003',
    relacionados: ['beau-01'],
  },
]

export async function seedDatabase() {
  try {
    // Verificar si ya hay datos
    const primerAutor = await getDoc(doc(db, 'autores', 'socrates'))
    if (primerAutor.exists()) {
      return { ok: false, message: 'La base de datos ya tiene datos cargados. Borralos manualmente en Firebase Console si querés recargar.' }
    }

    // Cargar autores
    for (const autor of AUTORES) {
      const { id, ...data } = autor
      await setDoc(doc(db, 'autores', id), data)
    }

    // Cargar recursos
    for (const recurso of RECURSOS) {
      const { id, ...data } = recurso
      await setDoc(doc(db, 'recursos', id), data)
    }

    return { ok: true, message: `Se cargaron ${AUTORES.length} autores y ${RECURSOS.length} recursos correctamente.` }
  } catch (err) {
    console.error('Error en seed:', err)
    return { ok: false, message: `Error: ${err.message}` }
  }
}
