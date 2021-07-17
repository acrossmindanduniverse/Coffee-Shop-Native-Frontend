import * as Yup from 'yup';
const primaryValidator = 'Characters too long';
const phoneRegEx =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const signUpSchema = Yup.object().shape({
  username: Yup.string()
    .email('Invalid email')
    .required('')
    .min(8, 'Email must be 8 or greater characters long')
    .max(20, primaryValidator)
    .required(''),
  password: Yup.string()
    .min(8, 'Password must be 8 or greater characters long')
    .max(30, primaryValidator),
  phone_number: Yup.string()
    .matches(phoneRegEx, 'Invalid phone number')
    .min(3, 'Phone number must be 10 or greater characters long')
    .max(15, primaryValidator),
});
