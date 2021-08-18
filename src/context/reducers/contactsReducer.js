import {
  GET_CONTACTS_isLOADING,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAIL,
  CREATE_CONTACT_FAIL,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_LOADING,
  EDIT_CONTACT_FAIL,
  EDIT_CONTACT_SUCCESS,
  EDIT_CONTACT_LOADING,
  CREATE_CONTACT_LOADING,
  CREATE_CONTACT_SUCCESS,
} from '../../constants/actionTypes/index.js';

// eslint-disable-next-line no-undef
export default contactsReducer = (state, {type, payload}) => {
  switch (type) {
    case EDIT_CONTACT_LOADING: {
      return {
        ...state,
        createContact: {
          ...state.createContact,
          isLoading: true,
          error: null,
        },
      };
    }

    case EDIT_CONTACT_SUCCESS: {
      return {
        ...state,
        createContact: {
          ...state.createContact,
          isLoading: false,
          error: null,
        },

        getContacts: {
          ...state.getContacts,
          isLoading: false,
          data: state.getContacts.data.map(item => {
            if (item.id === payload.id) {
              return payload;
            } else {
              return item;
            }
          }),
          error: null,
        },
      };
    }

    case EDIT_CONTACT_FAIL: {
      return {
        ...state,
        createContact: {
          ...state.createContact,
          isLoading: false,
          error: null,
        },
      };
    }

    case DELETE_CONTACT_LOADING: {
      return {
        ...state,
        deleteContact: {
          ...state.deleteContact,
          isLoading: true,
          error: null,
        },
      };
    }

    case DELETE_CONTACT_SUCCESS: {
      return {
        ...state,
        deleteContact: {
          ...state.deleteContact,
          isLoading: false,
          error: null,
        },

        getContacts: {
          ...state.getContacts,
          isLoading: false,
          data: state.getContacts.data.filter(item => item.id !== payload),
          error: null,
        },
      };
    }

    case CREATE_CONTACT_FAIL:
      return {
        ...state,
        createContact: {
          ...state.createContact,
          isLoading: false,
          error: null,
        },
      };
    case CREATE_CONTACT_LOADING:
      return {
        ...state,
        createContact: {
          ...state.createContact,
          isLoading: true,
          error: null,
        },
      };
    case CREATE_CONTACT_SUCCESS:
      return {
        ...state,
        createContact: {
          ...state.createContact,
          isLoading: false,
          error: null,
          data: payload,
        },

        getContacts: {
          ...state.getContacts,
          isLoading: false,
          data: [payload, ...state.getContacts.data],
          error: null,
        },
      };

    case CREATE_CONTACT_FAIL:
      return {
        ...state,
        createContact: {
          ...state.createContact,
          isLoading: false,
          error: payload,
        },
      };

    case GET_CONTACTS_isLOADING:
      return {
        ...state,
        getContacts: {
          ...state.getContacts,
          isisLoading: true,
          error: null,
        },
      };
    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        getContacts: {
          ...state.getContacts,
          isisLoading: false,
          error: null,
          data: payload,
        },
      };
    case GET_CONTACTS_FAIL:
      return {
        ...state,
        getContacts: {
          ...state.getContacts,
          isisLoading: false,
          error: payload,
        },
      };
    default:
      return state;
  }
};
