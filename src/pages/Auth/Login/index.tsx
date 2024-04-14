import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { validatePassword, validateEmail } from '../utils';

interface Props {
  handleClick: () => void;
}

const initialState = {
  login: '',
  password: '',
};

const Login = ({ handleClick }: Props) => {
  const [formValues, setFormValues] = useState(initialState);
  const [errorsText, setErrorsText] = useState(initialState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleConfirm = () => {
    const newErrors = {
      login: validateEmail(formValues.login),
      password: validatePassword(formValues.password),
    };
    setErrorsText(newErrors);
  };

  const clearError = (key: string) => {
    setErrorsText((prev) => ({ ...prev, [key]: '' }));
  };

  const handleBlur = (event: any) => {
    setErrorsText((prev) => ({
      ...prev,
      [event.target.name]: 'login' ? validateEmail(formValues.login) : validatePassword(formValues.password),
    }));
  };

  return (
    <>
      <h2 className="auth__title">Авторизация</h2>
      <div className="auth__block">
        <TextField
          onChange={onChange}
          name="login"
          label="Почта"
          value={formValues.login}
          variant="outlined"
          fullWidth
          helperText={errorsText.login}
          error={Boolean(errorsText.login)}
          onFocus={() => clearError('login')}
          onBlur={handleBlur}
        />
        <TextField
          onChange={onChange}
          name="password"
          label="Пароль"
          value={formValues.password}
          variant="outlined"
          fullWidth
          helperText={errorsText.password}
          error={Boolean(errorsText.password)}
          onFocus={() => clearError('password')}
          onBlur={handleBlur}
        />
        <Button onClick={handleConfirm} variant="outlined" size="medium">
          Подтвердить
        </Button>
      </div>
      <div className="auth__link">
        Нет учетной записи?{' '}
        <span onClick={handleClick} className="auth__link-text">
          Зарегистрируйтесь
        </span>
      </div>
    </>
  );
};

export default Login;
