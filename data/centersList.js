/* eslint-disable global-require */
const centersList = [
  {
    id: 1,
    location: 'https://maps.app.goo.gl/SxtYQG6c3WHiBn5z5?g_st=ic',
    title: 'ورشة صندوق الأدوات لصيانة السيارات',
    rates: 50,
    stars: [1, 1, 1, 1, 0],
    image: require('../assets/centers/center-image1.png'),
    services: [
      {
        serName: 'تغيير زيت',
        isChecked: false,
        serPrice: 120,
      },
      {
        serName: 'ترصيص إطارات',
        isChecked: false,
        serPrice: 280,
      },
      {
        serName: 'فحص كمبيوتر',
        isChecked: false,
        serPrice: 100,
      },
      {
        serName: 'تغيير بطاريات',
        isChecked: false,
        serPrice: 240,
      },
    ],
  },
  {
    id: 2,
    location: 'https://maps.app.goo.gl/3qf27qoKrEeTikA98?g_st=ic',
    title: 'مغسلة الشارقة للسيارات',
    services: [
      {
        serName: 'غسيل (بخار)',
        isChecked: false,
        serPrice: 95,
      },
      {
        serName: 'غسيل (داخلي وخارجي)',
        isChecked: false,
        serPrice: 33,
      },
      {
        serName: 'غسيل (داخلي)',
        isChecked: false,
        serPrice: 15,
      },
      {
        serName: 'غسيل (خارجي)',
        isChecked: false,
        serPrice: 15,
      },
      {
        serName: 'غسيل (ماكينة)',
        isChecked: false,
        serPrice: 50,
      },
    ],
    rates: 46,
    stars: [1, 1, 1, 0, 0],
    image: require('../assets/centers/center-image2.png'),
  },
  {
    id: 3,
    location: 'https://maps.app.goo.gl/KVJSCbuZfgQSb5Er6?g_st=ic',
    title: 'مركز وائل لصيانة السيارات',
    services: [
      {
        serName: 'تغيير زيت',
        isChecked: false,
        serPrice: 120,
      },
      {
        serName: 'ترصيص إطارات',
        isChecked: false,
        serPrice: 280,
      },
      {
        serName: 'فحص كمبيوتر',
        isChecked: false,
        serPrice: 100,
      },
      {
        serName: 'تغيير بطاريات',
        isChecked: false,
        serPrice: 240,
      },
      {
        serName: 'تغيير عفشة',
        isChecked: false,
        serPrice: 120,
      },
    ],
    rates: 42,
    stars: [1, 1, 1, 1, 0],
    image: require('../assets/centers/center-image3.png'),
  },
  {
    id: 4,
    location: 'https://maps.app.goo.gl/oTVxFmiMQ6Q4Dq12A?g_st=ic',
    title: 'مجموعة عز العرب لغسيل السيارات',
    services: [
      {
        serName: 'غسيل (بخار)',
        isChecked: false,
        serPrice: 95,
      },
      {
        serName: 'غسيل (داخلي وخارجي)',
        isChecked: false,
        serPrice: 33,
      },
      {
        serName: 'غسيل (داخلي)',
        isChecked: false,
        serPrice: 15,
      },
      {
        serName: 'غسيل (خارجي)',
        isChecked: false,
        serPrice: 15,
      },
      {
        serName: 'غسيل (ماكينة)',
        isChecked: false,
        serPrice: 50,
      },
    ],
    rates: 35,
    stars: [1, 1, 1, 1, 1],
    image: require('../assets/centers/center-image4.png'),
  },
  {
    id: 5,
    location: 'https://maps.app.goo.gl/RCH3me9qfCTJ4mtt9?g_st=ic',
    title: 'مراكز تغيير زيوت شل المعتمدة',
    services: [
      {
        serName: 'تغيير زيت',
        isChecked: false,
        serPrice: 120,
      },
      {
        serName: 'ترصيص إطارات',
        isChecked: false,
        serPrice: 280,
      },
      {
        serName: 'فحص كمبيوتر',
        isChecked: false,
        serPrice: 100,
      },
      {
        serName: 'تغيير بطاريات',
        isChecked: false,
        serPrice: 240,
      },
      {
        serName: 'تغيير عفشة',
        isChecked: false,
        serPrice: 120,
      },
    ],
    rates: 33,
    stars: [1, 0, 0, 0, 0],
    image: require('../assets/centers/center-image5.png'),
  },
  {
    id: 6,
    location: 'https://maps.app.goo.gl/qV9YTQywk7cozR3cA?g_st=ic',
    title: 'شركة هاى تك لخدمة وسائل النقل',
    services: [
      {
        serName: 'تغيير زيت',
        isChecked: false,
        serPrice: 120,
      },
      {
        serName: 'تغيير بطاريات',
        isChecked: false,
        serPrice: 240,
      },
      {
        serName: 'تغيير عفشة',
        isChecked: false,
        serPrice: 120,
      },
    ],
    rates: 29,
    stars: [1, 1, 1, 1, 0],
    image: require('../assets/centers/center-image6.png'),
  },
  {
    id: 7,
    location: 'https://maps.app.goo.gl/4EK5vJiTL7nFUuj59?g_st=ic',
    title: 'مركز الوطنية لخدمة وصيانة السيارات',
    services: [
      {
        serName: 'تغيير زيت',
        isChecked: false,
        serPrice: 120,
      },
      {
        serName: 'تغيير بطاريات',
        isChecked: false,
        serPrice: 240,
      },
      {
        serName: 'غسيل (داخلي)',
        isChecked: false,
        serPrice: 15,
      },
      {
        serName: 'غسيل (خارجي)',
        isChecked: false,
        serPrice: 15,
      },
      {
        serName: 'غسيل (ماكينة)',
        isChecked: false,
        serPrice: 50,
      },
    ],
    rates: 24,
    stars: [1, 1, 1, 0, 0],
    image: require('../assets/centers/center-image7.png'),
  },
  {
    id: 8,
    location: 'https://maps.app.goo.gl/FibkKXYSQVcbNny38?g_st=ic',
    title: 'شركة اليسر لصناعة هياكل السيارات',
    services: [
      {
        serName: 'غسيل (داخلي)',
        isChecked: false,
        serPrice: 15,
      },
      {
        serName: 'تغيير زيت',
        isChecked: false,
        serPrice: 120,
      },
      {
        serName: 'تغيير بطاريات',
        isChecked: false,
        serPrice: 240,
      },
      {
        serName: 'غسيل (خارجي)',
        isChecked: false,
        serPrice: 15,
      },
      {
        serName: 'غسيل (ماكينة)',
        isChecked: false,
        serPrice: 50,
      },
    ],
    rates: 21,
    stars: [1, 1, 1, 0, 0],
    image: require('../assets/centers/center-image8.png'),
  },
  {
    id: 9,
    location: 'https://maps.app.goo.gl/fMqkUfrUMpK1DLMw7?g_st=ic',
    title: 'ورشة انطون للسيارات',
    services: [
      {
        serName: 'تغيير زيت',
        isChecked: false,
        serPrice: 120,
      },
      {
        serName: 'تغيير بطاريات',
        isChecked: false,
        serPrice: 240,
      },
      {
        serName: 'تغيير عفشة',
        isChecked: false,
        serPrice: 120,
      },
    ],
    rates: 18,
    stars: [1, 1, 0, 0, 0],
    image: require('../assets/centers/center-image9.png'),
  },
  {
    id: 10,
    location: 'https://maps.app.goo.gl/AUTNhV4txE4FKJpTA?g_st=ic',
    title: 'ورشة أبو غالى اوتوموتيف',
    services: [
      {
        serName: 'تغيير زيت',
        isChecked: false,
        serPrice: 120,
      },
      {
        serName: 'ترصيص إطارات',
        isChecked: false,
        serPrice: 280,
      },
      {
        serName: 'فحص كمبيوتر',
        isChecked: false,
        serPrice: 100,
      },
      {
        serName: 'تغيير بطاريات',
        isChecked: false,
        serPrice: 240,
      },
      {
        serName: 'تغيير عفشة',
        isChecked: false,
        serPrice: 120,
      },
    ],
    rates: 15,
    stars: [1, 1, 1, 1, 1],
    image: require('../assets/centers/center-image10.png'),
  },
];

export default centersList;
