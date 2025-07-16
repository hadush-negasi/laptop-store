// Action Types
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const ADD_AUTH = 'ADD_AUTH';
export const REMOVE_AUTH = 'REMOVE_AUTH';
export const SET_PRODUCT_DETAIL = 'SET_PRODUCT_DETAIL';

// Action Creators
export const add = (data) => ({
  type: ADD_PRODUCT,
  payload: {
    ...data,
    proCount: (data.proCount || 0) + 1
  }
});

export const remove = (data) => ({
  type: REMOVE_PRODUCT,
  payload: {
    ...data,
    proCount: Math.max((data.proCount || 1) - 1, 0)
  }
});

export const update = (productId, updatedData) => ({
  type: EDIT_PRODUCT,
  payload: {
    id: productId,
    ...updatedData
  }
});

export const addAuth = (data) => ({
  type: ADD_AUTH,
  payload: data
});

export const remAuth = () => ({
  type: REMOVE_AUTH
});

export const setProductDetail = (product) => ({
  type: SET_PRODUCT_DETAIL,
  payload: product
});