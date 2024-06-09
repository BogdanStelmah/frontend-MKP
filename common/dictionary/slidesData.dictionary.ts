import i18n from '@/i18n';

export const getSlidesData = () => [
  {
    id: '1',
    title: i18n.t('introduction.slide1.title'),
    description: i18n.t('introduction.slide1.description'),
    imageSource: require('../../assets/images/slide_1.jpg')
  },
  {
    id: '2',
    title: i18n.t('introduction.slide2.title'),
    description: i18n.t('introduction.slide2.description'),
    imageSource: require('../../assets/images/slide_2.jpg')
  },
  {
    id: '3',
    title: i18n.t('introduction.slide3.title'),
    description: i18n.t('introduction.slide3.description'),
    imageSource: require('../../assets/images/slide_3.jpg')
  },
  {
    id: '4',
    title: i18n.t('introduction.slide4.title'),
    description: i18n.t('introduction.slide4.description'),
    imageSource: require('../../assets/images/slide_1.jpg')
  },
  {
    id: '5',
    title: i18n.t('introduction.slide5.title'),
    description: i18n.t('introduction.slide5.description'),
    imageSource: require('../../assets/images/slide_4.jpg')
  }
];
