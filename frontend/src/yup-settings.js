import * as yup from 'yup';

yup.setLocale({
  mixed: {
    default: 'Niepoprawnie wprowadzone dane',
  },
  string: {
    min: 'Pole wymaga minimum ${min} znaków'
  }
});

export default yup;
