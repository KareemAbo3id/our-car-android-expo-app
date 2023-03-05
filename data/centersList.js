/* eslint-disable global-require */
const centersList = [
  {
    id: 1,
    title: 'ورشة صندوق الأدوات لصيانة السيارات',
    rates: 50,
    stars: [1, 1, 1, 1, 0],
    image: require('../assets/centers/center-image1.png'),
    services: [
      {
        serName: 'تغيير زيت',
        serPrice: 120,
      },
      {
        serName: 'تغيير إطارات وترصيص كمبيوتر',
        serPrice: 280,
      },
      {
        serName: 'فحص كمبيوتر',
        serPrice: 100,
      },
      {
        serName: 'تغيير بطاريات',
        serPrice: 240,
      },
    ],
  },
  {
    id: 2,
    title: 'مغسلة الشارقة للسيارات',
    services: [
      {
        serName: 'غسيل (بخار)',
        serPrice: 95,
      },
      {
        serName: 'غسيل (داخلي وخارجي)',
        serPrice: 33,
      },
      {
        serName: 'غسيل (داخلي)',
        serPrice: 15,
      },
      {
        serName: 'غسيل (خارجي)',
        serPrice: 15,
      },
    ],
    rates: 46,
    stars: [1, 1, 1, 0, 0],
    image: require('../assets/centers/center-image2.png'),
  },
  {
    id: 3,
    title: 'مركز وائل لصيانة السيارات',
    services: [
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
    ],
    rates: 42,
    stars: [1, 1, 1, 1, 0],
    image: require('../assets/centers/center-image3.png'),
  },
  {
    id: 4,
    title: 'مجموعة عز العرب لغسيل السيارات',
    services: [
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
    ],
    rates: 35,
    stars: [1, 1, 1, 1, 1],
    image: require('../assets/centers/center-image4.png'),
  },
  {
    id: 5,
    title: 'مراكز تغيير زيوت شل المعتمدة',
    services: [
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
    ],
    rates: 33,
    stars: [1, 0, 0, 0, 0],
    image: require('../assets/centers/center-image5.png'),
  },
  {
    id: 6,
    title: 'شركة هاى تك لخدمة وسائل النقل',
    services: [
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
    ],
    rates: 29,
    stars: [1, 1, 1, 1, 0],
    image: require('../assets/centers/center-image6.png'),
  },
  {
    id: 7,
    title: 'مركز الوطنية لخدمة وصيانة السيارات',
    services: [
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
    ],
    rates: 24,
    stars: [1, 1, 1, 0, 0],
    image: require('../assets/centers/center-image7.png'),
  },
  {
    id: 8,
    title: 'شركة اليسر لصناعة هياكل السيارات',
    services: [
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
    ],
    rates: 21,
    stars: [1, 1, 1, 0, 0],
    image: require('../assets/centers/center-image8.png'),
  },
  {
    id: 9,
    title: 'ورشة انطون للسيارات',
    services: [
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
    ],
    rates: 18,
    stars: [1, 1, 0, 0, 0],
    image: require('../assets/centers/center-image9.png'),
  },
  {
    id: 10,
    title: 'ورشة أبو غالى اوتوموتيف',
    services: [
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
    ],
    rates: 15,
    stars: [1, 1, 1, 1, 1],
    image: require('../assets/centers/center-image10.png'),
  },
  {
    id: 11,
    title: 'مركز العالمي للإطارات والبطاريات',
    services: [
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
    ],
    rates: 12,
    stars: [1, 1, 1, 0, 0],
    image: require('../assets/centers/center-image11.png'),
  },
  {
    id: 12,
    title: 'مراكز الوعلان لصيانة السيارات',
    services: [
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
    ],
    rates: 9,
    stars: [1, 1, 1, 1, 0],
    image: require('../assets/centers/center-image12.png'),
  },
  {
    id: 13,
    title: 'مركز الخليج لصيانة وغسيل السيارات',
    services: [
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
    ],
    rates: 7,
    stars: [1, 0, 0, 0, 0],
    image: require('../assets/centers/center-image13.png'),
  },
  {
    id: 14,
    title: 'ورشة الرفيق للصيانة الشاملة',
    services: [
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
    ],
    rates: 6,
    stars: [1, 1, 1, 1, 1],
    image: require('../assets/centers/center-image14.png'),
  },
  {
    id: 15,
    title: 'مركز شام لصيانة السيارات',
    services: [
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
    ],
    rates: 5,
    stars: [1, 1, 1, 1, 0],
    image: require('../assets/centers/center-image15.png'),
  },
  {
    id: 16,
    title: 'مركز النجوم للنظافة الشاملة سيارات',
    services: [
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
    ],
    rates: 4,
    stars: [1, 1, 1, 1, 0],
    image: require('../assets/centers/center-image16.png'),
  },
  {
    id: 17,
    title: 'محطة اوتو للاطارات والقير',
    services: [
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
    ],
    rates: 3,
    stars: [1, 1, 1, 1, 0],
    image: require('../assets/centers/center-image17.png'),
  },
  {
    id: 18,
    title: 'المتخصص لغسيل السيارات',
    services: [
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
    ],
    rates: 2,
    stars: [1, 1, 0, 0, 0],
    image: require('../assets/centers/center-image18.png'),
  },
  {
    id: 19,
    title: 'شركة كلين كار',
    services: [
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
    ],
    rates: 1,
    stars: [1, 0, 0, 0, 0],
    image: require('../assets/centers/center-image19.png'),
  },
  {
    id: 20,
    title: 'مغسلة التلميع الذهبي',
    services: [
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
      {
        serName: 'غسيل (بخار)',
        serPrice: 250,
      },
    ],
    rates: 0,
    stars: [0, 0, 0, 0, 0],
    image: require('../assets/centers/center-image20.png'),
  },
];

export default centersList;
