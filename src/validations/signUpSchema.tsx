import * as yup from 'yup';

const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .required('Nome é obrigatório'),
  username: yup
    .string()
    .required('Nome de usuário é obrigatório'),
  email: yup
    .string()
    .email("Informe um email válido")
    .required('Email é obrigatório'),
  password: yup
    .string()
    .min(6, ({ min }) => `Senha deve ser no mínimo ${min} caracteres`)
    .required('Senha é obrigatório'),
});

export default signUpSchema;
