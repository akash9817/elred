const categories = [];

const handleCategory = (state = categories, action) => {
    switch (action.type) {
        case "SET_CATEGORY" : return action.payload
        break;

        case "GET_CATEGORY" :
            return [
                ...state,
                action.payload
            ]
        break;

        default: return state;
        break;

        
    }
}

export default handleCategory;