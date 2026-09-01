import { useEffect, useMemo, useState } from 'react'

const translations = {
  en: {
    language: 'Language', english: 'English', arabic: 'العربية', history: 'History', library: 'Library', calculator: 'Calculator', tools: 'Tools', about: 'About',
    heroEyebrow: 'Your intelligent science reference', heroTitle: 'Every formula you need.', heroTitleAccent: 'One place.', heroDescription: 'Explore essential formulas in mathematics, physics, engineering, chemistry, statistics, and finance. Understand them, then calculate your answer instantly.', formulas: 'formulas', disciplines: 'disciplines', waysToLearn: 'ways to learn', explore: 'Explore and learn', formulaLibrary: 'Formula library', search: 'Search a formula, concept, or symbol...', searchLabel: 'Search formulas', clearSearch: 'Clear search', noResults: 'No formulas found. Try another search.', all: 'All',
    meaning: 'Meaning', assumptions: 'Assumptions', example: 'Example', difficulty: 'Difficulty', related: 'Related formulas', source: 'Source', calculateResult: 'Calculate your result', calculate: 'Calculate now', fillFields: 'Please fill in every field.', invalidResult: 'These values cannot produce a valid result.', removeFavorite: 'Remove from favorites', addFavorite: 'Add to favorites', toggleTheme: 'Toggle theme',
    quickChallenge: 'Quick challenge', testKnowledge: 'Test your knowledge', quizDescription: 'Get a random formula and enter the correct answer.', startQuiz: 'Start quick quiz', useValues: 'Use these values', yourAnswer: 'Your answer', check: 'Check', correct: 'Correct! Great work.', notQuite: (answer) => `Not quite — the answer is ${answer}.`, unitConverter: 'Unit converter', convertUnits: 'Convert units', converterDescription: 'Switch between length, mass, time, temperature, and pressure units.', amount: 'Amount', convertFrom: 'Convert from', convertTo: 'Convert to', activity: 'Your activity', calculationHistory: 'Calculation history', clearHistory: 'Clear history', emptyHistory: 'Your recent calculations will appear here.',
    builtFor: 'Built for curious minds', understand: 'Understand the formula, not just the answer.', aboutText: 'FormulaHub helps you move from theory to practice with a clear reference and a simple calculator for every formula.', madeFor: 'Made for learning and discovery', category: (value) => value,
  },
  ar: {
    language: 'اللغة', english: 'English', arabic: 'العربية', history: 'السجل', library: 'المكتبة', calculator: 'الحاسبة', tools: 'الأدوات', about: 'عن المشروع',
    heroEyebrow: 'مرجعك العلمي الذكي', heroTitle: 'كل القوانين التي تحتاجها.', heroTitleAccent: 'في مكان واحد.', heroDescription: 'استكشف أهم القوانين في الرياضيات والفيزياء والهندسة والكيمياء والإحصاء والمالية. افهم القانون ثم احسب النتيجة فورًا.', formulas: 'قانون', disciplines: 'مجالات', waysToLearn: 'طرق للتعلم', explore: 'استكشف وتعلّم', formulaLibrary: 'مكتبة القوانين', search: 'ابحث عن قانون أو مفهوم أو رمز...', searchLabel: 'البحث في القوانين', clearSearch: 'مسح البحث', noResults: 'لم يتم العثور على قوانين. جرّب بحثًا آخر.', all: 'الكل',
    meaning: 'المعنى', assumptions: 'الافتراضات', example: 'مثال', difficulty: 'المستوى', related: 'قوانين مرتبطة', source: 'المصدر', calculateResult: 'احسب النتيجة', calculate: 'احسب الآن', fillFields: 'يرجى ملء جميع الحقول.', invalidResult: 'لا يمكن لهذه القيم إنتاج نتيجة صالحة.', removeFavorite: 'إزالة من المفضلة', addFavorite: 'إضافة إلى المفضلة', toggleTheme: 'تبديل المظهر',
    quickChallenge: 'تحدٍ سريع', testKnowledge: 'اختبر معلوماتك', quizDescription: 'احصل على قانون عشوائي وأدخل الإجابة الصحيحة.', startQuiz: 'ابدأ الاختبار السريع', useValues: 'استخدم هذه القيم', yourAnswer: 'إجابتك', check: 'تحقق', correct: 'صحيح! أحسنت.', notQuite: (answer) => `ليست الإجابة الصحيحة — الإجابة هي ${answer}.`, unitConverter: 'محول الوحدات', convertUnits: 'تحويل الوحدات', converterDescription: 'حوّل بين وحدات الطول والكتلة والزمن ودرجة الحرارة والضغط.', amount: 'القيمة', convertFrom: 'من', convertTo: 'إلى', activity: 'نشاطك', calculationHistory: 'سجل الحسابات', clearHistory: 'مسح السجل', emptyHistory: 'ستظهر حساباتك الأخيرة هنا.',
    builtFor: 'صُمم للعقول الفضولية', understand: 'افهم القانون، لا تكتفِ بالنتيجة.', aboutText: 'يساعدك FormulaHub على الانتقال من النظرية إلى التطبيق عبر مرجع واضح وحاسبة بسيطة لكل قانون.', madeFor: 'صُنع للتعلم والاكتشاف', category: (value) => ({ Math: 'رياضيات', Physics: 'فيزياء', Engineering: 'هندسة', Chemistry: 'كيمياء', Statistics: 'إحصاء', Finance: 'مالية' }[value] || value),
  },
}

export function useLanguage() {
  const [language, setLanguage] = useState(() => localStorage.getItem('formulahub-language') || 'en')
  const t = useMemo(() => translations[language], [language])
  useEffect(() => {
    localStorage.setItem('formulahub-language', language)
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])
  return { language, setLanguage, t }
}
