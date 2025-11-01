import { Monument, QuizQuestion, StoryChapter, StoryIntro } from '../types';

export const storyIntro: StoryIntro = {
  title: { kannada: 'ತಾಳಿಕೋಟೆ ಕದನದ ಪೀಠಿಕೆ', english: 'Prelude to the Battle of Talikota' },
  description: { kannada: '1565 ರಲ್ಲಿ ನಡೆದ ತಾಳಿಕೋಟೆ ಕದನವು ದಕ್ಷಿಣ ಭಾರತದ ಇತಿಹಾಸದಲ್ಲಿ ಒಂದು ನಿರ್ಣಾಯಕ ಕ್ಷಣವಾಗಿತ್ತು. ಇದು ವೈಭವಯುತ ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯವನ್ನು ಡೆಕ್ಕನ್ ಸುಲ್ತಾನರ ಒಕ್ಕೂಟದ ವಿರುದ್ಧ ನಿಲ್ಲಿಸಿತು. ಈ ಸಂಘರ್ಷವು ಕೇವಲ ಭೂಮಿಗಾಗಿ ನಡೆದ ಯುದ್ಧವಾಗಿರಲಿಲ್ಲ, ಬದಲಿಗೆ ಒಂದು ಸುವರ್ಣ ಯುಗದ ಭವಿಷ್ಯವನ್ನು ನಿರ್ಧರಿಸುವ ಮಹಾಸಂಗ್ರಾಮವಾಗಿತ್ತು.', english: 'The Battle of Talikota in 1565 was a major turning point in South India\'s history. The powerful Vijayanagara Empire fought against the combined armies of the Deccan Sultanates. This wasn\'t just a fight for land; it was a battle that would decide the future of a golden age.' },
  prompt: { kannada: 'ಈಗ, ಈ ಮಹಾಕಾವ್ಯದ ಅಧ್ಯಾಯಗಳು ನಿಮ್ಮ ಮುಂದೆ ತೆರೆದುಕೊಳ್ಳಲಿ.', english: 'Now, let the chapters of this epic story unfold.' }
};

export const storyChapters: StoryChapter[] = [
  {
    title: { kannada: "ಸಾಮ್ರಾಜ್ಯದ ಉದಯ", english: "The Rise of an Empire" },
    content: { kannada: "ಹರಿಹರ ಮತ್ತು ಬುಕ್ಕ ಎಂಬ ಇಬ್ಬರು ಸಹೋದರರಿಂದ 14ನೇ ಶತಮಾನದಲ್ಲಿ, ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯವು ದಕ್ಷಿಣ ಭಾರತದಲ್ಲಿ ಒಂದು ಪ್ರಬಲ ಶಕ್ತಿಯಾಗಿ ಹೊರಹೊಮ್ಮಿತು.", english: "Founded by two brothers, Harihara and Bukka, in the 14th century, the Vijayanagara Empire rose as a formidable power in Southern India." }
  },
  {
    title: { kannada: "ಸುವರ್ಣ ಯುಗ", english: "The Golden Age" },
    content: { kannada: "ಕೃಷ್ಣದೇವರಾಯನ ಆಳ್ವಿಕೆಯಲ್ಲಿ, ಸಾಮ್ರಾಜ್ಯವು ತನ್ನ ವೈಭವದ ಉತ್ತುಂಗವನ್ನು ತಲುಪಿತು. ಕಲೆ, ಸಾಹಿತ್ಯ ಮತ್ತು ವಾಸ್ತುಶಿಲ್ಪವು ಜಗತ್ತನ್ನು ಬೆರಗುಗೊಳಿಸಿತು.", english: "Under the rule of Krishnadevaraya, the empire reached its zenith of glory. Art, literature, and architecture flourished, dazzling the world." }
  },
  {
    title: { kannada: "ಸಂಘರ್ಷದ ಬೀಜಗಳು", english: "Seeds of Conflict" },
    content: { kannada: "ಆದರೆ, ನಿರಂತರ ಯುದ್ಧಗಳು ಮತ್ತು ರಾಜಕೀಯ ಪೈಪೋಟಿಯು, ನೆರೆಯ ಡೆಕ್ಕನ್ ಸುಲ್ತಾನರೊಂದಿಗೆ ಉದ್ವಿಗ್ನತೆಯನ್ನು ಹೆಚ್ಚಿಸಿತು.", english: "However, constant warfare and political rivalry began to sow seeds of tension with the neighboring Deccan Sultanates." }
  },
  {
    title: { kannada: "ಮಹಾ ಮೈತ್ರಿ", english: "The Great Alliance" },
    content: { kannada: "ವಿಜಯನಗರದ ಬೆಳೆಯುತ್ತಿರುವ ಪ್ರಭಾವವನ್ನು ತಡೆಯಲು, ಡೆಕ್ಕನ್ ಸುಲ್ತಾನರು ತಮ್ಮ ದ್ವೇಷವನ್ನು ಬದಿಗಿಟ್ಟು, ಒಟ್ಟಾಗಿ ಒಂದು ಮಹಾ ಮೈತ್ರಿಯನ್ನು ರಚಿಸಿದರು.", english: "To counter the growing influence of Vijayanagara, the Deccan Sultanates set aside their rivalries to form a great alliance against a common foe." }
  },
  {
    title: { kannada: "ತಾಳಿಕೋಟೆ ಕದನ", english: "The Battle of Talikota" },
    content: { kannada: "1565 ರಲ್ಲಿ, ತಾಳಿಕೋಟೆ ಎಂಬಲ್ಲಿ ಎರಡೂ ಸೈನ್ಯಗಳು ಮುಖಾಮುಖಿಯಾದವು. ಇದು ದಕ್ಷಿಣ ಭಾರತದ ಇತಿಹಾಸದಲ್ಲಿ ಒಂದು ನಿರ್ಣಾಯಕ ಯುದ್ಧವಾಗಿತ್ತು.", english: "In 1565, the two armies finally clashed at Talikota. It was a decisive battle that would change the course of South Indian history forever." }
  },
  {
    title: { kannada: "ನಂಬಿಕೆ ದ್ರೋಹ", english: "A Betrayal of Trust" },
    content: { kannada: "ಯುದ್ಧದ ನಿರ್ಣಾಯಕ ಕ್ಷಣದಲ್ಲಿ, ವಿಜಯನಗರದ ಇಬ್ಬರು ದಂಡನಾಯಕರು ಪಕ್ಷಾಂತರ ಮಾಡಿ, ಸೈന്യದ ಸೋಲಿಗೆ ಕಾರಣರಾದರು. ಇದು ಒಂದು ದೊಡ್ಡ ನಂಬಿಕೆದ್ರೋಹವಾಗಿತ್ತು.", english: "At a critical moment in the battle, two of Vijayanagara's own commanders switched sides, leading to the army's collapse. It was an act of great betrayal." }
  },
  {
    title: { kannada: "ರಾಜಧಾನಿಯ ಪತನ", english: "The Fall of a Capital" },
    content: { kannada: "ಯುದ್ಧದ ಸೋಲಿನ ನಂತರ, ವೈಭವದ ರಾಜಧಾನಿ ಹಂಪಿಯನ್ನು ಆರು ತಿಂಗಳ ಕಾಲ ಲೂಟಿ ಮಾಡಿ, ನಾಶಪಡಿಸಲಾಯಿತು. ಒಂದು ಯುಗವು ಅಂತ್ಯಗೊಂಡಿತು.", english: "After the defeat, the glorious capital of Hampi was systematically plundered and destroyed over six months, marking the end of an era." }
  },
  {
    title: { kannada: "ಶಾಶ್ವತ ಪರಂಪರೆ", english: "The Enduring Legacy" },
    content: { kannada: "ಆದರೂ, ಹಂಪಿಯ ಅವಶೇಷಗಳು ಇಂದಿಗೂ ವಿಜಯನಗರದ ಕಲೆ, ಸಂಸ್ಕೃತಿ ಮತ್ತು ವೈಭವದ ಕಥೆಯನ್ನು ಹೇಳುತ್ತಾ, ನಮ್ಮ ಪರಂಪರೆಯ ಹೆಮ್ಮೆಯಾಗಿ ನಿಂತಿವೆ.", english: "Yet, even in ruins, Hampi stands today as a proud testament to the art, culture, and glory of Vijayanagara, its story echoing through time." }
  }
];


export const monuments: Monument[] = [
  {
    name: { kannada: 'ವಿರೂಪಾಕ್ಷ ದೇವಸ್ಥಾನ', english: 'Virupaksha Temple' },
    heritageLine: { kannada: 'ಶಿವನಿಗೆ ಅರ್ಪಿತವಾದ ಹಂಪಿಯ ಪ್ರಮುಖ ದೇವಾಲಯ', english: 'The principal temple of Hampi, dedicated to Lord Shiva' },
    description: { kannada: 'ವಿರೂಪಾಕ್ಷ ದೇವಸ್ಥಾನವು ಹಂಪಿಯ ಅತ್ಯಂತ ಹಳೆಯ ಮತ್ತು ಪ್ರಮುಖ ದೇವಾಲಯವಾಗಿದೆ. ಇದು ತುಂಗಭದ್ರಾ ನದಿಯ ದಡದಲ್ಲಿದೆ ಮತ್ತು ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ಕಾಲದಿಂದಲೂ ನಿರಂತರವಾಗಿ ಪೂಜೆಗೊಳ್ಳುತ್ತಿದೆ.', english: 'Virupaksha Temple is the oldest and principal temple in Hampi. It is located on the banks of the Tungabhadra river and has been in continuous worship since the time of the Vijayanagara Empire.' },
    icon: '🕉️'
  },
  {
    name: { kannada: 'ವಿಜಯ ವಿಠ್ಠಲ ದೇವಸ್ಥಾನ', english: 'Vijaya Vittala Temple' },
    heritageLine: { kannada: 'ಕಲ್ಲಿನ ರಥ ಮತ್ತು ವಾಸ್ತುಶಿಲ್ಪಕ್ಕೆ ಪ್ರಸಿದ್ಧ', english: 'Famous for its stone chariot and architecture' },
    description: { kannada: 'ವಿಜಯ ವಿಠ್ಠಲ ದೇವಸ್ಥಾನವು ವಿಜಯನಗರ ವಾಸ್ತುಶಿಲ್ಪದ ಅತ್ಯುತ್ತಮ ಉದಾಹರಣೆಯಾಗಿದೆ. ಇಲ್ಲಿನ ಕಲ್ಲಿನ ರಥ ಮತ್ತು ಸಂಗೀತ ಹೊರಹೊಮ್ಮಿಸುವ ಕಂಬಗಳು ಪ್ರವಾಸಿಗರನ್ನು ಆಕರ್ಷಿಸುತ್ತವೆ.', english: 'The Vijaya Vittala Temple is an exceptional example of Vijayanagara architecture. Its iconic stone chariot and musical pillars attract tourists from all over the world.' },
    icon: '🛕'
  },
  {
    name: { kannada: 'ಕಲ್ಲಿನ ರಥ', english: 'Stone Chariot' },
    heritageLine: { kannada: 'ವಿಠ್ಠಲ ದೇವಸ್ಥಾನದ ಆವರಣದಲ್ಲಿರುವ ಏಕಶಿಲಾ ಶಿಲ್ಪ', english: 'A monolithic sculpture inside the Vittala Temple complex' },
    description: { kannada: 'ಹಂಪಿಯ ಕಲ್ಲಿನ ರಥವು ಭಾರತದ ಮೂರು ಪ್ರಸಿದ್ಧ ಕಲ್ಲಿನ ರಥಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ. ಇದನ್ನು ಗರುಡನಿಗೆ ಅರ್ಪಿಸಲಾಗಿದೆ ಮತ್ತು ಇದು ವಿಜಯನಗರ ಕಲೆಯ ಸಂಕೇತವಾಗಿದೆ.', english: 'The Stone Chariot of Hampi is one of the three famous stone chariots in India. It is dedicated to Garuda and is a symbol of Vijayanagara art.' },
    icon: '🗿'
  },
  {
    name: { kannada: 'ಕಮಲ ಮಹಲ್', english: 'Lotus Mahal' },
    heritageLine: { kannada: 'ರಾಣಿಯರ ಅರಮನೆಯ ವಿಶಿಷ್ಟ ರಚನೆ', english: 'A unique structure in the queen\'s palace' },
    description: { kannada: 'ಕಮಲ ಮಹಲ್, ಇಂಡೋ-ಇಸ್ಲಾಮಿಕ್ ವಾಸ್ತುಶಿಲ್ಪದ ಸುಂದರ ಮಿಶ್ರಣವಾಗಿದೆ. ಇದರ ಕಮಲದ ಆಕಾರದ ಕಮಾನುಗಳು ಮತ್ತು ಗುಮ್ಮಟಗಳು ಇದನ್ನು ವಿಶಿಷ್ಟವಾಗಿಸಿವೆ. ಇದನ್ನು ರಾಣಿಯರ ವಿಹಾರ ಸ್ಥಳವಾಗಿ ಬಳಸಲಾಗುತ್ತಿತ್ತು.', english: 'The Lotus Mahal is a beautiful blend of Indo-Islamic architecture. Its lotus-shaped arches and domes make it unique. It was used as a recreational area for the royal women.' },
    icon: '🌸'
  },
  {
    name: { kannada: 'ರಾಣಿಯರ ಸ್ನಾನಗೃಹ', english: 'Queen\'s Bath' },
    heritageLine: { kannada: 'ಅರಮನೆಯ ಮಹಿಳೆಯರಿಗಾಗಿ ಒಂದು ವಿಸ್ತಾರವಾದ ಸ್ನಾನದ ಕೊಳ', english: 'An elaborate bathing complex for the royal women' },
    description: { kannada: 'ರಾಣಿಯರ ಸ್ನಾನಗೃಹವು ಇಂಡೋ-ಇಸ್ಲಾಮಿಕ್ ಶೈಲಿಯ ವಾಸ್ತುಶಿಲ್ಪದ ಒಂದು ಅದ್ಭುತ ಉದಾಹರಣೆಯಾಗಿದೆ. ಇದು ಸರಳವಾದ ಹೊರಭಾಗವನ್ನು ಮತ್ತು ಸಂಕೀರ್ಣವಾದ ಒಳಾಂಗಣವನ್ನು ಹೊಂದಿದೆ, ಇದು ಅರಮನೆಯ ಮಹಿಳೆಯರಿಗೆ ಖಾಸಗಿ ಸ್ನಾನದ ಸ್ಥಳವಾಗಿತ್ತು.', english: 'The Queen\'s Bath is a stunning example of Indo-Islamic architecture. It features a plain exterior and an ornate interior, serving as a private bathing chamber for the women of the court.' },
    icon: '🛁'
  },
  {
    name: { kannada: 'ಆನೆ ಲಾಯ', english: 'Elephant Stables' },
    heritageLine: { kannada: 'ರಾಜಮನೆತನದ ಆನೆಗಳಿಗಾಗಿ ನಿರ್ಮಿಸಲಾದ ಭವ್ಯವಾದ ಲಾಯ', english: 'A magnificent stable for the royal elephants' },
    description: { kannada: 'ಆನೆ ಲಾಯವು ಉದ್ದವಾದ ಕಟ್ಟಡವಾಗಿದ್ದು, ಇದರಲ್ಲಿ 11 ಗುಮ್ಮಟಾಕಾರದ ಕೋಣೆಗಳಿವೆ. ಇದನ್ನು ರಾಜಮನೆತನದ ಆನೆಗಳನ್ನು ಇರಿಸಲು ಬಳಸಲಾಗುತ್ತಿತ್ತು. ಇದರ ವಾಸ್ತುಶಿಲ್ಪವು ವಿಜಯನಗರದ ಮಿಲಿಟರಿ ಶಕ್ತಿಯನ್ನು ಪ್ರದರ್ಶಿಸುತ್ತದೆ.', english: 'The Elephant Stables is a long building with a row of 11 domed chambers. It was used to house the royal elephants. Its architecture showcases the military might of Vijayanagara.' },
    icon: '🐘'
  },
  {
    name: { kannada: 'ಹಜಾರ ರಾಮ ದೇವಸ್ಥಾನ', english: 'Hazara Rama Temple' },
    heritageLine: { kannada: 'ರಾಮಾಯಣದ ಕಥೆಗಳನ್ನು ಚಿತ್ರಿಸುವ ಕೆತ್ತನೆಗಳಿಗೆ ಪ್ರಸಿದ್ಧ', english: 'Famous for carvings depicting the story of Ramayana' },
    description: { kannada: 'ಹಜಾರ ರಾಮ ದೇವಸ್ಥಾನವು ರಾಜಮನೆತನದ ಖಾಸಗಿ ದೇವಾಲಯವಾಗಿತ್ತು. ಇದರ ಗೋಡೆಗಳ ಮೇಲೆ ರಾಮಾಯಣದ ಕಥೆಯನ್ನು ವಿವರಿಸುವ ಸಾವಿರಾರು ಕೆತ್ತನೆಗಳಿವೆ, ಆದ್ದರಿಂದ ಇದಕ್ಕೆ "ಹಜಾರ ರಾಮ" (ಸಾವಿರ ರಾಮ) ಎಂದು ಹೆಸರು ಬಂದಿದೆ.', english: 'The Hazara Rama Temple was the private temple of the royals. Its walls are covered with thousands of carvings depicting the story of Ramayana, which gives it the name "Hazara Rama" (a thousand Ramas).' },
    icon: '📜'
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    question: { kannada: 'ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯವನ್ನು ಯಾರು ಸ್ಥಾಪಿಸಿದರು?', english: 'Who founded the Vijayanagara Empire?' },
    options: [
      { kannada: 'ಹರಿಹರ ಮತ್ತು ಬುಕ್ಕ', english: 'Harihara and Bukka' },
      { kannada: 'ಕೃಷ್ಣದೇವರಾಯ', english: 'Krishnadevaraya' },
      { kannada: 'ಅಶೋಕ', english: 'Ashoka' },
      { kannada: 'ಚಂದ್ರಗುಪ್ತ ಮೌರ್ಯ', english: 'Chandragupta Maurya' }
    ],
    correctAnswerIndex: 0
  },
  {
    question: { kannada: 'ತಾಳಿಕೋಟೆ ಯುದ್ಧ ಯಾವಾಗ ನಡೆಯಿತು?', english: 'When did the Battle of Talikota take place?' },
    options: [
      { kannada: '1526', english: '1526' },
      { kannada: '1565', english: '1565' },
      { kannada: '1757', english: '1757' },
      { kannada: '1498', english: '1498' }
    ],
    correctAnswerIndex: 1
  },
  {
    question: { kannada: 'ಹಂಪಿಯ ಕಲ್ಲಿನ ರಥ ಯಾವ ದೇವರಿಗೆ ಸಮರ್ಪಿತವಾಗಿದೆ?', english: 'To which deity is the Stone Chariot in Hampi dedicated?' },
    options: [
      { kannada: 'ಶಿವ', english: 'Shiva' },
      { kannada: 'ವಿಷ್ಣು', english: 'Vishnu' },
      { kannada: 'ಗರುಡ', english: 'Garuda' },
      { kannada: 'ಹನುಮಾನ್', english: 'Hanuman' }
    ],
    correctAnswerIndex: 2
  },
  {
    question: { kannada: 'ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ರಾಜಧಾನಿ ಯಾವುದಾಗಿತ್ತು?', english: 'What was the capital of the Vijayanagara Empire?' },
    options: [
      { kannada: 'ಮೈಸೂರು', english: 'Mysore' },
      { kannada: 'ಬಾದಾಮಿ', english: 'Badami' },
      { kannada: 'ಹಂಪಿ', english: 'Hampi' },
      { kannada: 'ದೆಹಲಿ', english: 'Delhi' }
    ],
    correctAnswerIndex: 2
  }
];