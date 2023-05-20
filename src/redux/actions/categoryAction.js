export const setCategory = (category) => {
    return {
        type : "SET_CATEGORY",
        payload : category
    }
}

export const getCategory = (category) => {
    return {
        type : "GET_CATEGORY",
        payload : category
    }
}