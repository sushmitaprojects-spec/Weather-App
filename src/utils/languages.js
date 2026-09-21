/**
 * Multilingual Translations for 10 Regional Languages
 * Supported: EN (English), HI (Hindi), TA (Tamil), TE (Telugu), BN (Bengali), MR (Marathi), GU (Gujarati), KN (Kannada), ML (Malayalam), PA (Punjabi)
 */

export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' }
];

export const TRANSLATIONS = {
  en: {
    appTitle: "Hyperlocal Thermal Stress & Extreme Weather AI",
    subTitle: "SIH26083 - Precision Public Health Decision Support",
    citizenTab: "Citizen Early Warning",
    govtTab: "Govt Decision Support Dashboard",
    liveStatus: "Live Weather Stream (Azure Event Hubs)",
    mlModel: "Azure ML Model v2.4 Active",
    
    // Form fields
    selectLocation: "Select Ward / Location",
    ageGroup: "Age Group",
    occupation: "Occupation",
    activityLevel: "Activity Exertion",
    exposureType: "Environmental Exposure",
    comorbidities: "Pre-existing Health Risk",
    
    // Ages
    child: "Child (0 - 12 yrs)",
    adult: "Adult (13 - 59 yrs)",
    elderly: "Elderly (60+ yrs)",
    
    // Occupations
    occ_construction: "Construction / Quarry Worker",
    occ_farmer: "Farmer / Agricultural Laborer",
    occ_delivery: "Delivery Driver / Gig Worker",
    occ_indoor_non_ac: "Factory / Non-AC Indoor Worker",
    occ_student: "Student / Indoor Desk Worker",
    occ_elderly: "Senior Citizen Resident",
    
    // Activity
    act_sedentary: "Low / Sedentary",
    act_moderate: "Moderate Exertion",
    act_heavy: "Heavy Manual Labor",
    
    // Exposure
    exp_indoor_ac: "Indoor (Air Conditioned)",
    exp_indoor_non_ac: "Indoor (Fan / Natural Ventilation)",
    exp_outdoor_shade: "Outdoor (Shaded Area)",
    exp_outdoor_sun: "Outdoor Direct Sunlight",

    // Risk Card
    personalRiskTitle: "Dynamic Human Thermal Stress Score",
    timeToCritical: "Time-to-Critical Warning",
    predictiveNotice: "Will cross Critical Risk threshold (UTCI > 38) between 1:00 PM – 4:00 PM.",
    aiAdviceTitle: "Azure AI Foundry Safety Guidance",
    dispatchAlertBtn: "Simulate SMS / WhatsApp Alert",

    // Recommendations
    rec_heavy_sun: "URGENT: Shift work hours to 6:00–9:00 AM. Consume 250ml electrolyte water every 30 mins. Seek shaded cooling shelter immediately.",
    rec_moderate: "Moderate risk. Avoid direct midday sun between 12 PM and 3 PM. Keep hydrated.",
    rec_safe: "Weather conditions are comfortable. Maintain standard hydration routines.",

    // Govt dashboard
    heatmapTitle: "Ward-Level Hyperlocal Thermal Risk Heatmap (100–500m Grid)",
    vulnerableFilter: "Vulnerable Population Overlay",
    hapTitle: "Automated Heat-Action Plan (HAP) Triggers",
    retrainTitle: "Azure ML Historical Learning & Accuracy Loop"
  },

  hi: {
    appTitle: "अति-स्थानीय तापीय तनाव और चरम मौसम एआई",
    subTitle: "SIH26083 - सटीक जन स्वास्थ्य चेतावनी प्रणाली",
    citizenTab: "नागरिक प्रारंभिक चेतावनी",
    govtTab: "सरकारी निर्णय सहायता डैशबोर्ड",
    liveStatus: "लाइव मौसम डेटा (अजूर इवेंट हब्स)",
    mlModel: "अजूर एमएल मॉडल v2.4 सक्रिय",

    selectLocation: "वार्ड / स्थान चुनें",
    ageGroup: "आयु वर्ग",
    occupation: "व्यवसाय",
    activityLevel: "शारीरिक श्रम स्तर",
    exposureType: "पर्यावरणीय संपर्क",
    comorbidities: "पूर्व-मौजूदा स्वास्थ्य स्थिति",

    child: "बच्चा (0 - 12 वर्ष)",
    adult: "वयस्क (13 - 59 वर्ष)",
    elderly: "बुजुर्ग (60+ वर्ष)",

    occ_construction: "निर्माण / खदान मजदूर",
    occ_farmer: "किसान / कृषि श्रमिक",
    occ_delivery: "डिलीवरी ड्राइवर / कामगार",
    occ_indoor_non_ac: "कारखाना / बिना एसी कामगार",
    occ_student: "छात्र / इनडोर डेस्क कार्यकर्ता",
    occ_elderly: "वरिष्ठ नागरिक निवासी",

    act_sedentary: "कम / सामान्य",
    act_moderate: "मध्यम श्रम",
    act_heavy: "भारी शारीरिक श्रम",

    exp_indoor_ac: "इनडोर (एयर कंडीशनर)",
    exp_indoor_non_ac: "इनडोर (पंखा / प्राकृतिक हवा)",
    exp_outdoor_shade: "बाहर (छायादार स्थान)",
    exp_outdoor_sun: "बाहर सीधी धूप",

    personalRiskTitle: "व्यक्तिगत तापीय तनाव स्कोर",
    timeToCritical: "गंभीर जोखिम की समय सीमा",
    predictiveNotice: "दोपहर 1:00 से 4:00 बजे के बीच गंभीर जोखिम सीमा (UTCI > 38) पार होने की भविष्यवाणी।",
    aiAdviceTitle: "अजूर एआई सुरक्षा सलाह",
    dispatchAlertBtn: "एसएमएस / व्हाट्सएप अलर्ट भेजें",

    rec_heavy_sun: "अति आवश्यक: काम का समय सुबह 6:00 से 9:00 बजे में बदलें। हर 30 मिनट में 250 मिली ओआरएस/पानी पिएं। तुरंत छायादार जगह पर आराम करें।",
    rec_moderate: "मध्यम जोखिम। दोपहर 12 से 3 बजे के बीच सीधी धूप से बचें। पानी पीते रहें।",
    rec_safe: "मौसम अनुकूल है। नियमित दिनचर्या बनाए रखें।",

    heatmapTitle: "वार्ड-स्तरीय तापीय जोखिम हीटमैप (100–500 मीटर)",
    vulnerableFilter: "संवेदनशील जनसंख्या की स्थिति",
    hapTitle: "स्वचालित हीट-एक्शन प्लान (HAP) ट्रिगर",
    retrainTitle: "मॉडल सटीकता और ऐतिहासिक शिक्षण"
  },

  ta: {
    appTitle: "அதிதீவிர வெப்பநிலை & காலநிலை AI எச்சரிக்கை",
    subTitle: "SIH26083 - துல்லியமான மக்கள் சுகாதார பாதுகாப்பு",
    citizenTab: "குடிமக்கள் முன்எச்சரிக்கை",
    govtTab: "அரசு கட்டுப்பாட்டு மையம்",
    liveStatus: "நேரலை வானிலை தரவு (Azure Event Hubs)",
    mlModel: "Azure ML v2.4 செயலில் உள்ளது",

    selectLocation: "வார்டு / இடத்தை தேர்வு செய்க",
    ageGroup: "வயது பிரிவு",
    occupation: "தொழில்",
    activityLevel: "உடலுழைப்பு அளவு",
    exposureType: "வெப்ப வெளிப்பாடு",
    comorbidities: "சுகாதார நிலை",

    child: "குழந்தை (0 - 12 வயது)",
    adult: "பெரியவர் (13 - 59 வயது)",
    elderly: "முதியவர் (60+ வயது)",

    occ_construction: "கட்டிட தொழிலாளி",
    occ_farmer: "விவசாயி / கூலி தொழிலாளி",
    occ_delivery: "டெலிவரி பணியாளர்",
    occ_indoor_non_ac: "தொழிற்சாலை பணியாளர் (AC இல்லை)",
    occ_student: "மாணவர் / அலுவலக பணியாளர்",
    occ_elderly: "முதியவர்",

    act_sedentary: "குறைந்த உழைப்பு",
    act_moderate: "மிதமான உழைப்பு",
    act_heavy: "கடுமையான உழைப்பு",

    exp_indoor_ac: "வீட்டுக்குள் (AC உள்ளது)",
    exp_indoor_non_ac: "வீட்டுக்குள் (மின்விசிறி)",
    exp_outdoor_shade: "வெளியே (நிழல் பகுதி)",
    exp_outdoor_sun: "வெளியே (நேரடி வெயில்)",

    personalRiskTitle: "தனிநபர் வெப்ப ஆபத்து புள்ளிகள்",
    timeToCritical: "ஆபத்தான நேர எச்சரிக்கை",
    predictiveNotice: "நாளை மதியம் 1-4 மணிக்குள் கடுமையான வெப்ப அபாயம் (UTCI > 38) ஏற்படும்.",
    aiAdviceTitle: "Azure AI பாதுகாப்பு பரிந்துரை",
    dispatchAlertBtn: "SMS / WhatsApp எச்சரிக்கை அனுப்பவும்",

    rec_heavy_sun: "அவசரம்: வேலை நேரத்தை காலை 6-9 மணிக்கு மாற்றவும். 30 நிமிடத்திற்கு ஒருமுறை 250மி.லி தண்ணீர் குடிக்கவும். நிழலில் ஓய்வெடுக்கவும்.",
    rec_moderate: "மிதமான அபாயம். மதியம் 12 முதல் 3 மணி வரை வெயிலில் செல்வதை தவிர்க்கவும்.",
    rec_safe: "வானிலை சீராக உள்ளது.",

    heatmapTitle: "வார்டு அளவிலான வெப்ப வரைபடம் (100–500மீ)",
    vulnerableFilter: "பாதிக்கப்படக்கூடிய மக்கள் விவரம்",
    hapTitle: "தானியங்கி வெப்ப நடவடிக்கை திட்டம் (HAP)",
    retrainTitle: "மாதிரி துல்லியம் & வரலாற்று கற்றல்"
  },

  te: {
    appTitle: "హైపర్‌లోకల్ థర్మల్ స్ట్రెస్ & వెదర్ AI",
    subTitle: "SIH26083 - ప్రజా ఆరోగ్య హెచ్చరిక వ్యవస్థ",
    citizenTab: "పౌరుల ముందస్తు హెచ్చరిక",
    govtTab: "ప్రభుత్వ నిర్ణయ మద్దతు డాష్‌బోర్డ్",
    liveStatus: "లైవ్ వెదర్ సమాచారం (Azure Event Hubs)",
    mlModel: "Azure ML v2.4 సక్రియంగా ఉంది",

    selectLocation: "వార్డు / ప్రాంతాన్ని ఎంచుకోండి",
    ageGroup: "వయోపరిమితి",
    occupation: "వృత్తి",
    activityLevel: "శారీరక శ్రమ",
    exposureType: "వాతావరణ ప్రభావం",
    comorbidities: "ఆరోగ్య సమస్యలు",

    child: "పిల్లలు (0 - 12 ఏళ్లు)",
    adult: "పాఠశాల / యువకులు (13 - 59 ఏళ్లు)",
    elderly: "వృద్ధులు (60+ ఏళ్లు)",

    occ_construction: "భవన నిర్మాణ కార్మికుడు",
    occ_farmer: "రైతు / వ్యవసాయ కూలీ",
    occ_delivery: "డెలివరీ బాయ్",
    occ_indoor_non_ac: "ఫ్యాక్టరీ కార్మికుడు (non-AC)",
    occ_student: "విద్యార్థి",
    occ_elderly: "వృద్ధ పౌరుడు",

    act_sedentary: "తక్కువ శ్రమ",
    act_moderate: "మధ్యస్థ శ్రమ",
    act_heavy: "అధిక శారీరక శ్రమ",

    exp_indoor_ac: "ఇంటి లోపల (AC ఉంది)",
    exp_indoor_non_ac: "ఇంటి లోపల (ఫ్యాన్)",
    exp_outdoor_shade: "బయట (నీడలో)",
    exp_outdoor_sun: "బయట ఎండలో",

    personalRiskTitle: "వ్యక్తిగత థర్మల్ రిస్క్ స్కోరు",
    timeToCritical: "తీవ్రమైన ప్రమాద హెచ్చరిక",
    predictiveNotice: "రేపు మధ్యాహ్నం 1-4 గంటల మధ్య తీవ్రమైన ఎండ దెబ్బ (UTCI > 38) తగిలే ప్రమాదం ఉంది.",
    aiAdviceTitle: "Azure AI భద్రతా సలహా",
    dispatchAlertBtn: "SMS / WhatsApp సందేశం పంపండి",

    rec_heavy_sun: "అత్యవసరం: పని వేళలను ఉదయం 6-9 గంటలకు మార్చండి. ప్రతి 30 నిమిషాలకు 250ml మంచి నీరు లేదా ఓఆర్‌ఎస్ తాగండి.",
    rec_moderate: "మధ్యస్థ ప్రమాదం. మధ్యాహ్నం 12 నుండి 3 గంటల వరకు ఎండలో వెళ్లవద్దు.",
    rec_safe: "వాతావరణం అనుకూలంగా ఉంది."
  },

  bn: {
    appTitle: "হাইপারলোকাল থার্মাল স্ট্রেস ও আবহাওয়া এআই",
    subTitle: "SIH26083 - নির্ভুল জনস্বাস্থ্য আগাম সতর্কবার্তা",
    citizenTab: "নাগরিক পূর্বসতর্কতা",
    govtTab: "সরকারি নিয়ন্ত্রণ ড্যাশবোর্ড",
    liveStatus: "লাইভ ওয়েদার স্ট্রিম (Azure Event Hubs)",
    mlModel: "Azure ML Model v2.4 সক্রিয়",

    selectLocation: "ওয়ার্ড / এলাকা নির্বাচন করুন",
    ageGroup: "বয়স সীমা",
    occupation: "পেশা",
    activityLevel: "শারীরিক পরিশ্রমের মাত্রা",
    exposureType: "পরিবেশগত এক্সপোজার",
    comorbidities: "পূর্ববর্তী স্বাস্থ্য সমস্যা",

    child: "শিশু (০ - ১২ বছর)",
    adult: "প্রাপ্তবয়স্ক (১৩ - ৫৯ বছর)",
    elderly: "বয়স্ক (৬০+ বছর)",

    occ_construction: "নির্মাণ শ্রমিক",
    occ_farmer: "কৃষক / কৃষি শ্রমিক",
    occ_delivery: "ডেলিভারি কর্মী",
    occ_indoor_non_ac: "কারখানা শ্রমিক (non-AC)",
    occ_student: "শিক্ষার্থী",
    occ_elderly: "বয়স্ক নাগরিক",

    act_sedentary: "কম শ্রম",
    act_moderate: "মাঝারি শ্রম",
    act_heavy: "কঠোর পরিশ্রম",

    exp_indoor_ac: "ঘরের ভেতর (এসি)",
    exp_indoor_non_ac: "ঘরের ভেতর (পাখা)",
    exp_outdoor_shade: "বাইরে (ছায়ায়)",
    exp_outdoor_sun: "বাইরে (সরাসরি রোদে)",

    personalRiskTitle: "ব্যক্তিগত থার্মাল স্ট্রেস স্কোর",
    timeToCritical: "জরুরি ঝুঁকির সময়সীমা",
    predictiveNotice: "দুপুর ১টা থেকে ৪টের মধ্যে মারাত্মক ঝুঁকি (UTCI > 38) তৈরি হওয়ার সম্ভাবনা।",
    aiAdviceTitle: "অ্যাজুর এআই নিরাপত্তা পরামর্শ",
    dispatchAlertBtn: "এসএমএস / হোয়াটসঅ্যাপ সতর্কতা পাঠান",

    rec_heavy_sun: "জরুরি: কাজের সময় সকাল ৬টা-৯টায় সরিয়ে নিন। প্রতি ৩০ মিনিটে ২৫০ মিলি জল পান করুন। ছায়ায় আশ্রয় নিন।",
    rec_moderate: "মাঝারি ঝুঁকি। দুপুর ১২টা থেকে ৩টে পর্যন্ত কড়া রোদ এড়িয়ে চলুন।",
    rec_safe: "আবহাওয়া স্বাভাবিক।"
  },

  mr: {
    appTitle: "हायपरलोकल औष्णिक ताण आणि हवामान एआय",
    subTitle: "SIH26083 - अचूक सार्वजनिक आरोग्य पूर्वसूचना प्रणाली",
    citizenTab: "नागरिक पूर्वसूचना",
    govtTab: "शासकीय निर्णय सहाय्यक डैशबोर्ड",
    liveStatus: "थेट हवामान प्रवाह (Azure Event Hubs)",
    mlModel: "Azure ML मॉडेल v2.4 सक्रिय",

    selectLocation: "वॉर्ड / ठिकाण निवडा",
    ageGroup: "वयोगट",
    occupation: "व्यवसाय",
    activityLevel: "शारीरिक श्रमाची पातळी",
    exposureType: "पर्यावरणीय संपर्क",
    comorbidities: "आरोग्य समस्या",

    child: "मूल (0 - 12 वर्षे)",
    adult: "प्रौढ (13 - 59 वर्षे)",
    elderly: "ज्येष्ठ नागरिक (60+ वर्षे)",

    occ_construction: "बांधकाम मजूर",
    occ_farmer: "शेतकरी / शेतमजूर",
    occ_delivery: "डिलीव्हरी कामगार",
    occ_indoor_non_ac: "कारखाना कामगार (विना एसी)",
    occ_student: "विद्यार्थी",
    occ_elderly: "ज्येष्ठ नागरिक",

    act_sedentary: "कमी श्रम",
    act_moderate: "मध्यम श्रम",
    act_heavy: "कठीण शारीरिक श्रम",

    exp_indoor_ac: "घरामध्ये (एसी)",
    exp_indoor_non_ac: "घरामध्ये (पंखा)",
    exp_outdoor_shade: "बाहेर (सावलीत)",
    exp_outdoor_sun: "बाहेर (थेट उन्हात)",

    personalRiskTitle: "वैयक्तिक औष्णिक ताण गुणक्रम (Score)",
    timeToCritical: "गंभीर धोक्याची वेळ",
    predictiveNotice: "दुपारी 1 ते 4 दरम्यान अत्यंत गंभीर उष्णतेचा इशारा (UTCI > 38).",
    aiAdviceTitle: "अझुर एआय सुरक्षा सल्ला",
    dispatchAlertBtn: "SMS / WhatsApp अलर्ट पाठवा",

    rec_heavy_sun: "अत्यंत महत्वाचे: कामाची वेळ सकाळी 6 ते 9 करा. दर 30 मिनिटांनी 250 मिली पाणी प्या. सावलीत विश्रांती घ्या.",
    rec_moderate: "मध्यम धोका. दुपारी 12 ते 3 दरम्यान उन्हात जाणे टाळा.",
    rec_safe: "हवामान अनुकूल आहे."
  },

  gu: {
    appTitle: "હાઇપરલોકલ થર્મલ સ્ટ્રેસ અને હવામાન AI",
    subTitle: "SIH26083 - સચોટ જાહેરસવાસ્થ્ય ચેતવણી સિસ્ટમ",
    citizenTab: "નાગરિક પ્રારંભિક ચેતવણી",
    govtTab: "સરકારી નિર્ણય સહાયક ડેશબોર્ડ",
    liveStatus: "લાઇવ વાતાવરણ ડેટા (Azure Event Hubs)",
    mlModel: "Azure ML મોડેલ v2.4 કાર્યરત",

    selectLocation: "વોર્ડ / સ્થળ પસંદ કરો",
    ageGroup: "વય જૂથ",
    occupation: "વ્યવસાય",
    activityLevel: "શારીરિક શ્રમ",
    exposureType: "પર્યાવરણીય પ્રભાવ",
    comorbidities: "સ્વાસ્થ્ય સમસ્યાઓ",

    child: "બાળક (0 - 12 વર્ષ)",
    adult: "પુખ્ત (13 - 59 વર્ષ)",
    elderly: "વૃદ્ધ (60+ વર્ષ)",

    occ_construction: "બાંધકામ મજૂર",
    occ_farmer: "ખેડૂત / ખેતમજૂર",
    occ_delivery: "ડિલિવરી બોય",
    occ_indoor_non_ac: "ફેક્ટરી મજૂર (non-AC)",
    occ_student: "વિદ્યાર્થી",
    occ_elderly: "વૃદ્ધ નાગરિક",

    act_sedentary: "ઓછો શ્રમ",
    act_moderate: "મધ્યમ શ્રમ",
    act_heavy: "ભારે શારીરિક શ્રમ",

    exp_indoor_ac: "ઘરની અંદર (AC)",
    exp_indoor_non_ac: "ઘરની અંદર (પંખો)",
    exp_outdoor_shade: "બહાર (છાંયડામાં)",
    exp_outdoor_sun: "બહાર (સીધા તડકામાં)",

    personalRiskTitle: "વ્યક્તિગત થર્મલ રિસ્ક સ્કોર",
    timeToCritical: "ગંભીર જોખમની સમયસીમા",
    predictiveNotice: "બપોરે 1 થી 4 વાગ્યા વચ્ચે ગંભીર હીટવેવ (UTCI > 38) નું જોખમ.",
    aiAdviceTitle: "Azure AI સુરક્ષા સલાહ",
    dispatchAlertBtn: "SMS / WhatsApp અલર્ટ મોકલો",

    rec_heavy_sun: "અતિ મહત્વનું: કામનો સમય સવારે 6 થી 9 કરો. દર 30 મિનિટે 250ml ઓઆરએસ/પાણી પીઓ. છાંયડામાં આરામ કરો.",
    rec_moderate: "મધ્યમ જોખમ. બપોરે 12 થી 3 તડકામાં જવાનું ટાળો.",
    rec_safe: "હવામાન અનુકૂળ છે."
  },

  kn: {
    appTitle: "ಹೈಪರ್‌ಲೋಕಲ್ ಹವಾಮಾನ & ತಾಪಮಾನ AI ಮುನ್ನೆಚ್ಚರಿಕೆ",
    subTitle: "SIH26083 - ನಿಖರ ಸಾರ್ವಜನಿಕ ಆರೋಗ್ಯ ಮುನ್ನೆಚ್ಚರಿಕೆ ವ್ಯವಸ್ಥೆ",
    citizenTab: "ನಾಗರಿಕ ಮುನ್ನೆಚ್ಚರಿಕೆ",
    govtTab: "ಸರ್ಕಾರಿ ನಿರ್ಧಾರ ಬೆಂಬಲ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    liveStatus: "ಲೈವ್ ಹವಾಮಾನ ಮಾಹಿತಿ (Azure Event Hubs)",
    mlModel: "Azure ML v2.4 ಸಕ್ರಿಯವಾಗಿದೆ",

    selectLocation: "ವಾರ್ಡ್ / ಸ್ಥಳ ಆಯ್ಕೆಮಾಡಿ",
    ageGroup: "ವಯಸ್ಸಿನ ಗುಂಪು",
    occupation: "ವೃತ್ತಿ",
    activityLevel: "ದೈಹಿಕ ಶ್ರಮ",
    exposureType: "ಪರಿಸರ ಪ್ರಭಾವ",
    comorbidities: "ಆರೋಗ್ಯ ಸಮಸ್ಯೆಗಳು",

    child: "ಮಗು (0 - 12 ವರ್ಷ)",
    adult: "ವಯಸ್ಕರು (13 - 59 ವರ್ಷ)",
    elderly: "ಹಿರಿಯ ನಾಗರಿಕರು (60+ ವರ್ಷ)",

    occ_construction: "ಕಟ್ಟಡ ಕಾರ್ಮಿಕ",
    occ_farmer: "ರೈತ / ಕೃಷಿ ಕಾರ್ಮಿಕ",
    occ_delivery: "ಡೆಲಿವರಿ ಕಾರ್ಮಿಕ",
    occ_indoor_non_ac: "ಫ್ಯಾಕ್ಟರಿ ಕಾರ್ಮಿಕ (non-AC)",
    occ_student: "ವಿದ್ಯಾರ್ಥಿ",
    occ_elderly: "ಹಿರಿಯ ನಾಗರಿಕ",

    act_sedentary: "ಕಡಿಮೆ ಶ್ರಮ",
    act_moderate: "ಮಧ್ಯಮ ಶ್ರಮ",
    act_heavy: "ಅಧಿಕ ದೈಹಿಕ ಶ್ರಮ",

    exp_indoor_ac: "ಒಳಾಂಗಣ (AC)",
    exp_indoor_non_ac: "ಒಳಾಂಗಣ (ಫ್ಯಾನ್)",
    exp_outdoor_shade: "ಹೊರಾಂಗಣ (ನೆರಳಿನಲ್ಲಿ)",
    exp_outdoor_sun: "ಹೊರಾಂಗಣ (ನೇರ ಬಿಸಿಲು)",

    personalRiskTitle: "ವೈಯಕ್ತಿಕ ತಾಪಮಾನ ಅಪಾಯದ ಅಂಕ",
    timeToCritical: "ಅಪಾಯಕಾರಿ ಸಮಯದ ಎಚ್ಚರಿಕೆ",
    predictiveNotice: "ನಾಳೆ ಮಧ್ಯಾಹ್ನ 1 ರಿಂದ 4 ಗಂಟೆಯ ನಡುವೆ ತೀವ್ರ ಶಾಖದ ಅಪಾಯ (UTCI > 38) ಸಂಭವಿಸಬಹುದು.",
    aiAdviceTitle: "Azure AI ಸುರಕ್ಷತಾ ಸಲಹೆ",
    dispatchAlertBtn: "SMS / WhatsApp ಮುನ್ನೆಚ್ಚರಿಕೆ ಕಳುಹಿಸಿ",

    rec_heavy_sun: "ತುರ್ತು: ಕೆಲಸದ ಸಮಯವನ್ನು ಬೆಳಿಗ್ಗೆ 6-9 ಕ್ಕೆ ಬದಲಾಯಿಸಿ. ಪ್ರತಿ 30 ನಿಮಿಷಕ್ಕೆ 250ml ನೀರು ಕುಡಿಯಿರಿ. ನೆರಳಿನಲ್ಲಿ ವಿಶ್ರಮಿಸಿ.",
    rec_moderate: "ಮಧ್ಯಮ ಅಪಾಯ. ಮಧ್ಯಾಹ್ನ 12 ರಿಂದ 3 ರವರೆಗೆ ಬಿಸಿಲಿನಲ್ಲಿ ಹೋಗಬೇಡಿ.",
    rec_safe: "ಹವಾಮಾನ ಸಹಜವಾಗಿದೆ."
  },

  ml: {
    appTitle: "ഹൈപ്പർലോക്കൽ തെർമൽ സ്ട്രെസ് & വെതർ എഐ",
    subTitle: "SIH26083 - കൃത്യമായ പൊതുജനാരോഗ്യ മുന്നറിയിപ്പ് സിസ്റ്റം",
    citizenTab: "പൗരന്മാരുടെ മുൻകരുതൽ",
    govtTab: "ഗവൺമെന്റ് കൺട്രോൾ ഡാഷ്‌ബോർഡ്",
    liveStatus: "തത്സമയ കാലാവസ്ഥ ഡാറ്റ (Azure Event Hubs)",
    mlModel: "Azure ML മോഡൽ v2.4 സജ്ജമാണ്",

    selectLocation: "വാർഡ് / സ്ഥലം തിരഞ്ഞെടുക്കുക",
    ageGroup: "പ്രായപരിധി",
    occupation: "തൊഴിൽ",
    activityLevel: "ശാരീരിക അധ്വാനം",
    exposureType: "പരിസ്ഥിതി exposure",
    comorbidities: "ആരോഗ്യ പ്രശ്നങ്ങൾ",

    child: "കുട്ടി (0 - 12 വയസ്സ്)",
    adult: "മുതിർന്നയാൾ (13 - 59 വയസ്സ്)",
    elderly: "വയോധികർ (60+ വയസ്സ്)",

    occ_construction: "നിർമ്മാണ തൊഴിലാളി",
    occ_farmer: "കർഷകൻ / തോട്ടം തൊഴിലാളി",
    occ_delivery: "ഡെലിവറി ബോയ്",
    occ_indoor_non_ac: "ഫാക്ടറി തൊഴിലാളി (Non-AC)",
    occ_student: "വിദ്യാർത്ഥി",
    occ_elderly: "വയോധികൻ",

    act_sedentary: "കുറഞ്ഞ അധ്വാനം",
    act_moderate: "മിതമായ അധ്വാനം",
    act_heavy: "കഠിനാധ്വാനം",

    exp_indoor_ac: "ഇൻഡോർ (AC)",
    exp_indoor_non_ac: "ഇൻഡോർ (ഫാൻ)",
    exp_outdoor_shade: "ഔട്ട്ഡോർ (തണലിൽ)",
    exp_outdoor_sun: "ഔട്ട്ഡോർ (നേരിട്ടുള്ള വെയിലിൽ)",

    personalRiskTitle: "വ്യക്തിഗത തെർമൽ റിസ്ക് സ്കോർ",
    timeToCritical: "ഗുരുതരമായ അപകട മുന്നറിയിപ്പ്",
    predictiveNotice: "ഉച്ചയ്ക്ക് 1 മുതൽ 4 വരെ ഗുരുതരമായ സൂര്യാഘാത സാധ്യത (UTCI > 38).",
    aiAdviceTitle: "Azure AI സുരക്ഷാ നിർദ്ദേശം",
    dispatchAlertBtn: "SMS / WhatsApp സന്ദേശം അയക്കുക",

    rec_heavy_sun: "അടിയന്തിരം: ജോലി സമയം രാവിലത്തെ 6-9 ലേക്ക് മാറ്റുക. 30 മിനിറ്റ് കൂടുമ്പോൾ 250ml വെള്ളം കുടിക്കുക.",
    rec_moderate: "മിതമായ അപകടസാധ്യത. ഉച്ചയ്ക്ക് 12 നും 3 നും ഇടയിൽ വെയിൽ കൊള്ളരുത്.",
    rec_safe: "കാലാവസ്ഥ സാധാരണമാണ്."
  },

  pa: {
    appTitle: "ਹਾਈਪਰਲੋਕਲ ਥਰਮਲ ਸਟ੍ਰੈਸ ਅਤੇ ਮੌਸਮ AI",
    subTitle: "SIH26083 - ਸਟੀਕ ਜਨਤਕ ਸਿਹਤ ਚੇਤਾਵਨੀ ਪ੍ਰਣਾਲੀ",
    citizenTab: "ਨਾਗਰਿਕ ਪੂਰਵ ਚੇਤਾਵਨੀ",
    govtTab: "ਸਰਕਾਰੀ ਫੈਸਲਾ ਸਹਾਇਤਾ ਡੈਸ਼ਬੋਰਡ",
    liveStatus: "ਲਾਈਵ ਮੌਸਮ ਡੇਟਾ (Azure Event Hubs)",
    mlModel: "Azure ML ਮਾਡਲ v2.4 ਸਰਗਰਮ",

    selectLocation: "ਵਾਰਡ / ਸਥਾਨ ਚੁਣੋ",
    ageGroup: "ਉਮਰ ਸਮੂਹ",
    occupation: "ਕੰਮ / ਕਿੱਤਾ",
    activityLevel: "ਸਰੀਰਕ ਮਿਹਨਤ",
    exposureType: "ਵਾਤਾਵਰਣ ਦਾ ਪ੍ਰਭਾਵ",
    comorbidities: "ਪਹਿਲਾਂ ਤੋਂ ਸਿਹਤ ਸਮੱਸਿਆਵਾਂ",

    child: "ਬੱਚਾ (0 - 12 ਸਾਲ)",
    adult: "ਬਾਲਗ (13 - 59 ਸਾਲ)",
    elderly: "ਬਜ਼ੁਰਗ (60+ ਸਾਲ)",

    occ_construction: "ਉਸਾਰੀ ਮਜ਼ਦੂਰ",
    occ_farmer: "ਕਿਸਾਨ / ਖੇਤ ਮਜ਼ਦੂਰ",
    occ_delivery: "ਡਿਲੀਵਰੀ ਵਰਕਰ",
    occ_indoor_non_ac: "ਫੈਕਟਰੀ ਮਜ਼ਦੂਰ (ਬਿਨਾ AC)",
    occ_student: "ਵਿਦਿਆਰਥੀ",
    occ_elderly: "ਬਜ਼ੁਰਗ ਨਾਗਰਿਕ",

    act_sedentary: "ਘੱਟ ਮਿਹਨਤ",
    act_moderate: "ਦਰਮਿਆਨੀ ਮਿਹਨਤ",
    act_heavy: "ਭਾਰੀ ਸਰੀਰਕ ਮਿਹਨਤ",

    exp_indoor_ac: "ਅੰਦਰ (AC)",
    exp_indoor_non_ac: "ਅੰਦਰ (ਪੱਖਾ)",
    exp_outdoor_shade: "ਬਾਹਰ (ਛਾਂ ਵਿੱਚ)",
    exp_outdoor_sun: "ਬਾਹਰ (ਸਿੱਧੀ ਧੁੱਪ ਵਿੱਚ)",

    personalRiskTitle: "ਨਿੱਜੀ ਥਰਮਲ ਰਿਸਕ ਸਕੋਰ",
    timeToCritical: "ਗੰਭੀਰ ਖਤਰੇ ਦੀ ਚੇਤਾਵਨੀ",
    predictiveNotice: "ਦੁਪਹਿਰ 1 ਤੋਂ 4 ਵਜੇ ਦੇ ਵਿਚਕਾਰ ਭਾਰੀ ਲੂ / ਗਰਮੀ (UTCI > 38) ਦਾ ਖਤਰਾ।",
    aiAdviceTitle: "Azure AI ਸੁਰੱਖਿਆ ਸਲਾਹ",
    dispatchAlertBtn: "SMS / WhatsApp ਚੇਤਾਵਨੀ ਭੇਜੋ",

    rec_heavy_sun: "ਅਤਿ ਜ਼ਰੂਰੀ: ਕੰਮ ਦਾ ਸਮਾਂ ਸਵੇਰੇ 6 ਤੋਂ 9 ਵਜੇ ਕਰੋ। ਹਰ 30 ਮਿੰਟ ਬਾਅਦ 250ml ਪਾਣੀ ਪੀਓ। ਛਾਂ ਵਿੱਚ ਆਰਾਮ ਕਰੋ।",
    rec_moderate: "ਦਰਮਿਆਨਾ ਖਤਰਾ। ਦੁਪਹਿਰ 12 ਤੋਂ 3 ਵਜੇ ਤੱਕ ਧੁੱਪ ਵਿੱਚ ਜਾਣ ਤੋਂ ਬਚੋ।",
    rec_safe: "ਮੌਸਮ ਅਨੁਕੂਲ ਹੈ।"
  }
};
