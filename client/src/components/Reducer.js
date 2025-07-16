const initialState = {
  products: [], // For cart items
  productDetail: null // For the currently viewed product
};

const productReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_PRODUCT': {
      const existingProduct = state.products.find(item => item._id === action.payload.id);
      
      if (existingProduct) {
        return {
          ...state,
          products: state.products.map(product => 
            product._id === action.payload.id 
              ? { ...product, proCount: product.proCount + 1 }
              : product
          )
        };
      }
      
      return {
        ...state,
        products: [...state.products, { ...action.payload, proCount: 1 }]
      };
    }
    
    case 'REMOVE_PRODUCT': {
      const existingProduct = state.products.find(item => item.id === action.payload.id);
      
      if (!existingProduct) return state;
      
      if (existingProduct.proCount > 1) {
        return {
          ...state,
          products: state.products.map(product => 
            product.id === action.payload.id 
              ? { ...product, proCount: product.proCount - 1 }
              : product
          )
        };
      }
      
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload.id)
      };
    }
    
    case 'EDIT_PRODUCT': {
      return {
        ...state,
        products: state.products.map(product => 
          product.id === action.payload.id 
            ? { ...product, ...action.payload }
            : product
        )
      };
    }
    
    case 'SET_PRODUCT_DETAIL': {
      return {
        ...state,
        productDetail: action.payload
      };
    }
    
    default:
      return state;
  }
};

export default productReducer;