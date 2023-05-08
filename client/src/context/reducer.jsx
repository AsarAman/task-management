import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  CREATE_TASK_BEGIN,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
  GET_ALLTASKS_BEGIN,
  GET_ALLTASKS_SUCCESS,
  
  DELETE_ITEM_BEGIN,
  DELETE_ITEM_SUCCESS,
  
  
  EDIT_ITEM_BEGIN,
  
  
} from "./action";

const reducer = (state, action) => {
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.name,
      token: action.payload.token,
      userId: action.payload.userId,
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return { ...state, isLoading: false, alertText: action.payload.message };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: false };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.name,
      token: action.payload.token,
      userId: action.payload.userId,
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return { ...state, isLoading: false, alertText: action.payload.message };
  }
  if (action.type === CREATE_TASK_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_TASK_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      tasks: [action.payload.result, ...state.tasks],
    };
  }
  if (action.type === CREATE_TASK_ERROR) {
    return { ...state, isLoading: false, alertText: action.payload.message };
  }
  if (action.type === GET_ALLTASKS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_ALLTASKS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      tasks: action.payload,
    };
  }
  if(action.type === DELETE_ITEM_BEGIN){
    return {...state, isLoading:true}
  }
  if(action.type === DELETE_ITEM_SUCCESS){
    return {...state, isLoading:false, alertText:action.payload.message}
  }
  
  if(action.type === EDIT_ITEM_BEGIN){
    return {...state, isLoading:false}
  }
  throw new Error(`No action with ${action.type}`);
};

export default reducer;
