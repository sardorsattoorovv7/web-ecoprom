// src/data/products.js

export const productsData = [
  { 
    id: 1, 
    slug: 'pir-devor', 
    name: 'PIR Devor Paneli', 
    img: '/assets/1.png',
    description: 'Bino devorlari uchun mo‘ljallangan, energiya tejamkor PIR sendvich panellari. Issiqlikni saqlash bo‘yicha eng yuqori ko‘rsatkichga ega.',
    details: [
      'Olovga chidamlilik: G1 klassi (yonmaydi)',
      'Zichlik: 40-42 kg/m³',
      'Qalinligi: 50mm dan 200mm gacha',
      'O‘rnatish: Yashirin va ochiq qulflash tizimi'
    ],
    specs: 'Material: Poliizotsianurat | Qoplama: Ruxlangan po‘lat'
  },
  { 
    id: 2, 
    slug: 'pur-tom', 
    name: 'Tom yopish Paneli', 
    img: '/assets/2.png', 
    description: 'Yomg‘ir va qordan mukammal himoya qiluvchi, 5 qovurg‘ali (traposidal) tom sendvich panellari.',
    details: [
      'Gidroizolyatsiya: Suv o‘tkazmaslik kafolati',
      'Mustahkamlik: Yuqori yuklamalarga bardoshli',
      'Issiqlik saqlash: Sovuq va issiqdan himoya',
      'Ranglar: RAL katalogi bo‘yicha istalgan rang'
    ],
    specs: 'Turi: 5 qovurg‘ali | Qalinligi: 50-150mm'
  },
  { 
    id: 3, 
    slug: 'agregat', 
    name: 'Zanglamaydigan PIR Panel', 
    img: '/assets/3.png', 
    description: 'Oziq-ovqat sanoati va farmatsevtika uchun maxsus, zanglamaydigan po‘latdan (nerjaveyka) ishlangan panellar.',
    details: [
      'Gigiyena: Bakteriyalar ko‘paymaydigan silliq yuza',
      'Chidamlilik: Kislota va agressiv yuvish vositalariga bardoshli',
      'Standart: SanPiN talablariga to‘liq javob beradi',
      'Qoplama: AISI 304 yoki AISI 430 po‘lati'
    ],
    specs: 'Material: Nerjaveyka | To‘ldirgich: PIR'
  },
  { 
    id: 4, 
    slug: 'eshik', 
    name: 'Sovutgich Eshigi (Standart)', 
    img: '/assets/4.png', 
    description: 'O‘rtacha haroratli sovutgich kameralari uchun mo‘ljallangan, yengil va ishonchli eshik konstruksiyasi.',
    details: [
      'Rama: Alyuminiy profilli',
      'Izolyatsiya: Penopoliuretan to‘ldirgichi',
      'Mexanizm: Xitoy yuqori sifatli furniturasi',
      'Uплотнитель: Sovuqqa chidamli rezina tasmalar'
    ],
    specs: 'Turi: Bir tabaqali | Ochilish: O‘ngga/Chapga'
  },
  { 
    id: 5, 
    slug: 'profil', 
    name: 'Sovutgich Eshigi (Alyuminiy)', 
    img: '/assets/5.png', 
    description: 'Alyuminiy rama bilan kuchaytirilgan, estetik jihatdan chiroyli va korroziyaga chidamli eshiklar.',
    details: [
      'Material: Anodlangan alyuminiy',
      'Vazni: Juda yengil va qulay',
      'Xizmat muddati: 15 yildan ortiq',
      'O‘lchamlar: Mijoz xohishiga ko‘ra (Custom)'
    ],
    specs: 'Rama: Alyuminiy | To‘ldirgich: PUR'
  },
  { 
    id: 6, 
    slug: 'burchak', 
    name: 'Muzlatkich Eshigi (F3)', 
    img: '/assets/6.png', 
    description: 'Past haroratli (-25°C gacha) muzlatish kameralari uchun mo‘ljallangan maxsus eshik.',
    details: [
      'Isitish: Eshik ramasi bo‘ylab isitish tili (TEN) mavjud',
      'Muzlashga qarshi: Eshik rezinalari muzlab qolmaydi',
      'Qalinligi: 100mm dan 120mm gacha',
      'Xavfsizlik: Ichkaridan ochish mexanizmi'
    ],
    specs: 'Harorat: -18°C dan -25°C gacha'
  },
  { 
    id: 7, 
    slug: 'kondensator', 
    name: 'Sanoat Eshigi (F4)', 
    img: '/assets/7.png', 
    description: 'Katta hajmdagi omborxonalar va zavodlar uchun mo‘ljallangan keng formatli sanoat eshiklari.',
    details: [
      'Gabarit: Katta o‘lchamdagi texnikalar kirishi uchun qulay',
      'Mustahkamlik: Kuchaytirilgan petlyalar',
      'Himoya: Mexanik zarbalarga chidamlilik',
      'Avtomatika: Masofadan boshqarish imkoniyati (ixtiyoriy)'
    ],
    specs: 'Turi: Sürgülü (Rulonli) yoki Menteşeli'
  },
  { 
    id: 8, 
    slug: 'kompressor', 
    name: 'Kuchaytirilgan Eshik (F5)', 
    img: '/assets/8.png', 
    description: 'Doimiy va og‘ir yuklamalar ostida ishlovchi kameralar uchun 3 ta petlyali kuchaytirilgan model.',
    details: [
      'Petlyalar: 3 ta yuqori yuklamaga chidamli petlya',
      'Konstruksiya: Deformatsiyaga uchramaydigan metall karkas',
      'Izolyatsiya: Yuqori zichlikdagi PUR',
      'Rang: RAL 9003 (Oq) yoki buyurtma asosida'
    ],
    specs: 'Rama: Chelik + Alyuminiy | Yuklama: Maksimal'
  },
  { 
    id: 9, 
    slug: 'kopik', 
    name: 'Maxsus Sovutish Eshigi', 
    img: '/assets/9.png', 
    description: 'Namlik va sovuqqa o‘ta chidamli, maxsus plastik qoplamali sovutish eshiklari.',
    details: [
      'Yuzasi: Namlikdan himoyalangan plastik/metall',
      'Tozalik: Tibbiyot va labaratoriyalar uchun mos',
      'Germetiklik: 100% havo o‘tkazmaslik',
      'Fiting: Zanglamaydigan furnitura'
    ],
    specs: 'Material: Kompozit | To‘ldirgich: PIR'
  },
  { 
    id: 10, 
    slug: 'fiting', 
    name: 'Fitinglar va Mahkamlagichlar', 
    img: '/assets/10.png', 
    description: 'Sendvich panellar va sovutgich eshiklarini o‘rnatish uchun zarur bo‘lgan barcha butlovchi qismlar.',
    details: [
      'Samorezlari: Har xil o‘lchamdagi panel buramalari',
      'Ugoloklar: Alyuminiy va plastik burchaklar',
      'Germetik: Sovuqqa chidamli silikonlar',
      'Petlyalar: Eshiklar uchun maxsus furnitura'
    ],
    specs: 'Turi: Komplektlovchi qismlar'
  },
  { 
    id: 11, 
    slug: 'ventilyator', 
    name: 'Sanoat Ventilyatori', 
    img: '/assets/11.png', 
    description: 'Sovutish tizimlari va kondensator bloklari uchun mo‘ljallangan yuqori unumdorlikdagi fanatlar.',
    details: [
      'Dvigatel: Kam energiya sarflovchi motor',
      'Shovqin: Past shovqin darajasi',
      'Himoya: IP54/IP55 suv va changdan himoya',
      'Pichoqlar: Alyuminiy yoki kompozit material'
    ],
    specs: 'Brend: Axial/Centrifugal | Kuchlanish: 220V/380V'
  },
  { 
    id: 12, 
    slug: 'panel', 
    name: 'Sendvich Panel (Penoplast)', 
    img: '/assets/12.png', 
    description: 'Hamyonbop va yengil, penoplast (EPS) to‘ldirgichli sendvich panellar.',
    details: [
      'Narxi: Eng arzon issiqlik izolyatsiya materiali',
      'Vazni: Juda yengil, montaj qilish oson',
      'Qo‘llanilishi: Vaqtinchalik binolar va do‘konlar',
      'To‘ldirgich: Ko‘piksimon polistirol (EPS)'
    ],
    specs: 'Zichlik: 15-25 kg/m³ | Narx: Tejamkor'
  },
  { 
    id: 13, 
    slug: 'evaporator', 
    name: 'Bitzer Porshenli Kompressori', 
    img: '/assets/13.png', 
    description: 'Germaniyaning Bitzer brendiga tegishli, sovutish tizimlarining yuragi hisoblangan ishonchli kompressor.',
    details: [
      'Sifat: Dunyodagi 1-raqamli sovutish brendi',
      'Unumdorlik: Yuqori sovutish quvvati',
      'Ta’mirlash: Yarim germetik dizayn tufayli ta’mirlash oson',
      'Kafolat: Uzoq yillik xizmat muddati'
    ],
    specs: 'Brend: Bitzer (Germany) | Turi: Yarim germetik'
  },
  { 
    id: 14, 
    slug: 'fiksator', 
    name: 'Kondensator Agregati', 
    img: '/assets/14.png', 
    description: 'Havo bilan sovutiladigan, komplekt holatidagi tashqi sovutish bloki.',
    details: [
      'Tarkibi: Fanat, kondensator, resiver',
      'Sovutish agenti: R404A, R134a, R22 gazlariga mos',
      'Rama: Korroziyaga qarshi bo‘yalgan po‘lat',
      'Ishlash: Issiqlikni samarali chiqarib yuborish'
    ],
    specs: 'Turi: Havo sovutishli | Agregat'
  },
  { 
    id: 15, 
    slug: 'binolar', 
    name: 'Bitzer Kondensatorli Agregat', 
    img: '/assets/15.png', 
    description: 'Bitzer kompressori asosida yig‘ilgan, sanoat muzlatkichlari uchun tayyor professional sovutish stansiyasi.',
    details: [
      'Tayyor yechim: Barcha qismlari zavodda yig‘ilgan',
      'Avtomatika: To‘liq boshqaruv paneli bilan ta’minlangan',
      'Energiya: Maksimal darajada tejamkor',
      'Qo‘llanilishi: Meva-sabzavot omborlari va go‘sht sexlari'
    ],
    specs: 'Kompressor: Bitzer | Agregat: Komplekt'
  }
];