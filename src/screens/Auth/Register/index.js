import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useContext} from 'react';
import RegisterComponent from '../../../components/Auth/Signup';
import {useFocusEffect} from '@react-navigation/native';
import register, {clearAuthState} from '../../../context/actions/auth/register';
import {GlobalContext} from '../../../context/Provider';
import {LOGIN} from '../../../constants/routerName.js';

const Register = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const {navigate} = useNavigation();
  const {
    authDispatch,
    authState: {error, isLoading, data},
  } = useContext(GlobalContext);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     return () => {
  //       if (data || error) {
  //         clearAuthState()(authDispatch);
  //       }
  //     };
  //   }, [data, error]),
  // );

  useEffect(() => {
    return () => {
      clearAuthState()(authDispatch);
    };
  }, []);

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});

    if (value !== '') {
      if (name === 'password') {
        if (value.length < 6) {
          setErrors(prev => {
            return {...prev, [name]: 'This field heeds min 6 charecters'};
          });
        } else {
          setErrors(prev => {
            return {...prev, [name]: null};
          });
        }
      } else {
        setErrors(prev => {
          return {...prev, [name]: null};
        });
      }
    } else {
      setErrors(prev => {
        return {...prev, [name]: 'This field is required'};
      });
    }
  };

  const onSubmit = () => {
    if (!form.userName) {
      setErrors(prev => {
        return {...prev, userName: 'Please add a username '};
      });
    }
    if (!form.firstName) {
      setErrors(prev => {
        return {...prev, firstName: 'Please add a  first name'};
      });
    }
    if (!form.lastName) {
      setErrors(prev => {
        return {...prev, lastName: 'Please add a last name'};
      });
    }
    if (!form.email) {
      setErrors(prev => {
        return {...prev, email: 'Please add a email'};
      });
    }
    if (!form.password) {
      setErrors(prev => {
        return {...prev, password: 'Please add a password'};
      });
    }

    //convert form fields
    if (
      Object.values(form).length === 5 &&
      Object.values(form).every(item => item.trim().length > 0) &&
      Object.values(errors).every(item => !item)
    ) {
      register(form)(authDispatch)(data => {
        navigate(LOGIN, {data});
      });
    }
  };
  return (
    <RegisterComponent
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      errors={errors}
      error={error}
      loading={isLoading}
    />
  );
};

export default Register;
