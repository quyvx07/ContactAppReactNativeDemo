import React, {useState, useContext, useRef, useEffect} from 'react';
import CreateContactComponent from '../../../components/Home/CreateContactComponent';
import {GlobalContext} from '../../../context/Provider';
import createContact from '../../../context/actions/contacts/createContact';
import editContact from '../../../context/actions/contacts/editContact';
import {CONTACT_LIST, CONTACT_DETAIL} from '../../../constants/routerName.js';
import {useNavigation, useRoute} from '@react-navigation/native';
import uploadImage from '../../../helpers/uploadImage.js';
import countryCodes from '../../../utils/countryCodes';

const CreateContact = () => {
  const {navigate} = useNavigation();
  const {
    contactsDispatch,
    contactsState: {
      createContact: {isLoading, error},
    },
  } = useContext(GlobalContext);
  const {params} = useRoute();
  const {setOptions} = useNavigation();

  const sheetRef = useRef(null);
  const [form, setForm] = useState({});
  const [upLoading, setIsUploading] = useState(false);

  const [localFile, setLocalFile] = useState(null);

  useEffect(() => {
    if (params?.contact) {
      setOptions({title: 'Update contact'});
      const {
        first_name: firstName,
        phone_number: phoneNumber,
        last_name: lastName,
        is_favorite: isFavorite,
        country_code: countryCode,
      } = params?.contact;

      setForm(prev => {
        return {
          ...prev,
          firstName,
          isFavorite,
          phoneNumber,
          lastName,
          phoneCode: countryCode,
        };
      });

      const country = countryCodes.find(item => {
        return item.value.replace('+', '') === countryCode;
      });

      if (country) {
        setForm(prev => {
          return {
            ...prev,
            countryCode: country.key.toUpperCase(),
          };
        });
      }

      if (params?.contact?.contact_picture) {
        setLocalFile(params?.contact.contact_picture);
      }
    }
  }, []);

  const onChangeText = ({name, value}) => {
    setForm({...form, [name]: value});
  };

  const onSubmit = () => {
    if (params?.contact) {
      if (localFile?.size) {
        setIsUploading(true);
        uploadImage(localFile)(url => {
          setIsUploading(false);
          editContact(
            {...form, contactPicture: url},
            params?.contact.id,
          )(contactsDispatch)(item => {
            navigate(CONTACT_DETAIL, {item});
          });
        })(err => {
          console.log('err :>> ', err);
          setIsUploading(false);
        });
      } else {
        editContact(form, params?.contact.id)(contactsDispatch)(item => {
          navigate(CONTACT_DETAIL, {item});
        });
      }
    } else {
      if (localFile?.size) {
        setIsUploading(true);
        uploadImage(localFile)(url => {
          setIsUploading(false);
          createContact({...form, contactPicture: url})(contactsDispatch)(
            () => {
              navigate(CONTACT_LIST);
            },
          );
        })(err => {
          setIsUploading(false);
        });
      } else {
        createContact(form)(contactsDispatch)(() => {
          navigate(CONTACT_LIST);
        });
      }
    }
  };

  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };

  const onFileSelected = image => {
    closeSheet();
    setLocalFile(image);
  };
  const toggleValueChange = () => {
    setForm({...form, isFavorite: !form.isFavorite});
  };

  return (
    <CreateContactComponent
      form={form}
      setForm={setForm}
      onChangeText={onChangeText}
      onSubmit={onSubmit}
      loading={isLoading || upLoading}
      error={error}
      toggleValueChange={toggleValueChange}
      sheetRef={sheetRef}
      closeSheet={closeSheet}
      openSheet={openSheet}
      onFileSelected={onFileSelected}
      localFile={localFile}
    />
  );
};

export default CreateContact;
