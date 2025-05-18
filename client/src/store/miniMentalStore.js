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
        { id: 'mem-1', text: 'לשנן 3 מילים מיד לאחר שמיעה', points: 3, answer: null },
        { id: 'mem-2', text: 'לשנן את אותן 3 מילים אחרי כמה דקות', points: 3, answer: null },
      ],
    },
    {
      id: 'language',
      title: 'שפה',
      questions: [
        { id: 'lang-1', text: ' יש לזהות שני חפצים פשוטים - נקודה לכל אחד', points: 2, answer: null },
        { id: 'lang-2', text: 'יש לחזור על משפט', points: 1, answer: null },
        { id: 'lang-3', text: 'יש לבצע הוראה פשוטה בת שלושה שלבים - נקודה לכל שלב', points: 3, answer: null },
        { id: 'lang-4', text: 'יש לבצע הוראה כתובה', points: 1, answer: null },
        { id: 'lang-5', text: 'יש לכתוב משפט', points: 1, answer: null },


      ],
    },
    
    {
      id: 'copy',
      title: 'העתקה',
      description: 'יש להעתיק מבנה מורכב, כמו שני מחומשים, או עיגול בתוך ריבוע',
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
