import { create } from 'zustand';

const useMiniMentalStore = create((set) => ({
  sections: [
    {
      id: 'orientation-time',
      title: 'התמצאות בזמן',
      questions: [
        { id: 'time-1', text: 'איזה יום היום?', points: 1, answer: null },
        { id: 'time-2', text: 'מה החודש בו אנחנו נמצאים?', points: 1, answer: null },
        { id: 'time-3', text: 'מה התאריך?', points: 1, answer: null },
        { id: 'time-4', text: 'מה השנה?', points: 1, answer: null },
        { id: 'time-5', text: 'מה עונת השנה?', points: 1, answer: null },
      ],
    },
    {
      id: 'orientation-place',
      title: 'התמצאות במקום',
      questions: [
        { id: 'place-1', text: 'איפה אנחנו נמצאים?', points: 1, answer: null },
        { id: 'place-2', text: 'באיזה חדר אתה?', points: 1, answer: null },
        { id: 'place-3', text: 'איפה אנחנו בארץ?', points: 1, answer: null },
        { id: 'place-4', text: 'באיזה עיר אנחנו נמצאים?', points: 1, answer: null },
        { id: 'place-5', text: 'באיזה מדינה אנחנו?', points: 1, answer: null },
      ],
    },
    {
      id: 'calculation',
      title: 'יכולת חישוב',
      description: 'יש לחסר את המספר 7 מן המספר 100, ולהמשיך לחסר 7 מכל תוצאה שהתקבלה. במשך 5 פעמים.',
      questions: [
        { id: 'calc-1', text: '100 - 7 = 93', points: 1, answer: null },
        { id: 'calc-2', text: '93 - 7 = 86', points: 1, answer: null },
        { id: 'calc-3', text: '86 - 7 = 79', points: 1, answer: null },
        { id: 'calc-4', text: '79 - 7 = 72', points: 1, answer: null },
        { id: 'calc-5', text: '72 - 7 = 65', points: 1, answer: null },
      ],
    },
    {
      id: 'memory',
      title: 'יכולת זיכרון',
      description: 'על הנבדק לשנן שלוש מילים, פעם אחת מיד ולשנן אותן שוב אחר זמן מה.',
      questions: [
        { id: 'mem-1', text: 'לשנן 3 מילים מיד לאחר שמיעה', points: 1, answer: null },
        { id: 'mem-2', text: 'לשנן את אותן 3 מילים אחרי כמה דקות', points: 1, answer: null },
      ],
    },
    {
      id: 'language',
      title: 'שפה ויכולת דיבור',
      questions: [
        { id: 'lang-1', text: 'להקשיב שוב לרצף מילים ולחזור עליו במדויק', points: 1, answer: null },
        { id: 'lang-2', text: 'להציע שם לחפץ פשוט', points: 1, answer: null },
      ],
    },
    {
      id: 'repetition',
      title: 'חזרה אחר משפט',
      questions: [
        { id: 'rep-1', text: 'לחזור משפט מורכב בן 5 מילים', points: 1, answer: null },
      ],
    },
    {
      id: 'comprehension',
      title: 'הבנת הוראות',
      questions: [
        { id: 'comp-1', text: 'לבצע שתי הוראות פשוטות לפי הסדר', points: 1, answer: null },
      ],
    },
    {
      id: 'reading',
      title: 'קריאה',
      questions: [
        { id: 'read-1', text: 'לקרוא הוראה פשוטה ולפעול על פיה', points: 1, answer: null },
      ],
    },
    {
      id: 'writing',
      title: 'כתיבה',
      questions: [
        { id: 'write-1', text: 'לכתוב משפט פשוט עם משמעות', points: 1, answer: null },
      ],
    },
    {
      id: 'copy',
      title: 'העתקה',
      description: 'העתקת צורה דו־ממדית מורכבת, כמו שני חומשים או ציור בתוך ריבוע.',
      questions: [
        { id: 'copy-1', text: 'העתקה של מבנה גיאומטרי', points: 1, answer: null },
      ],
    },
  ],

  setAnswer: (sectionId, questionId, answer) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              questions: section.questions.map((q) =>
                q.id === questionId ? { ...q, answer } : q
              ),
            }
          : section
      ),
    })),

  reset: () =>
    set(() => ({
      sections: useMiniMentalStore.getState().sections.map((section) => ({
        ...section,
        questions: section.questions.map((q) => ({ ...q, answer: null })),
      })),
    })),
}));

export default useMiniMentalStore;
