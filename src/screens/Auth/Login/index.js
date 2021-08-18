import React, {useState, useContext} from 'react';
import {useRoute} from '@react-navigation/native';
import LoginComponent from '../../../components/Auth/Login';
import loginUser from '../../../context/actions/auth/loginUser';
import {GlobalContext} from '../../../context/Provider';
import {clearAuthState} from '../../../context/actions/auth/register.js';

const Login = () => {
  const [form, setForm] = useState({});
  const [justSignedUp, setJustSignedUp] = useState(false);
  const {params} = useRoute();

  const {
    authDispatch,
    authState: {error, isLoading},
  } = useContext(GlobalContext);

  React.useEffect(() => {
    if (params?.data) {
      setJustSignedUp(true);
      setForm({...form, userName: params.data.username});
    }
    return () => {
      clearAuthState()(authDispatch);
    };
  }, [params]);

  const onSubmit = () => {
    if (form.userName && form.password) {
      loginUser(form)(authDispatch);
    }
  };

  const onChange = ({name, value}) => {
    setJustSignedUp(false);
    setForm({...form, [name]: value});
  };

  return (
    <LoginComponent
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      error={error}
      loading={isLoading}
      justSignedUp={justSignedUp}
    />
  );
};
export default Login;
