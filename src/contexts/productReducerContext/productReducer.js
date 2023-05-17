import { types } from './types';

export const ProductReducer = (state, action) => {
    const {
        SEARCH
    } = types

    switch (action.type) {
        case SEARCH:
            if (action?.payload?.input) {
                return {
                    ...state,
                    searchData: [
                        ...action?.payload?.data?.filter(({ title }) => title.slice(0, action?.payload?.input.length).toLowerCase() === action?.payload?.input.toLowerCase()),
                        ...action?.payload?.data?.filter(({ title }) => title.slice(0, action?.payload?.input.length).toLowerCase() !== action?.payload?.input.toLowerCase())
                            ?.filter(({ title }) => title.toLowerCase()?.includes(action?.payload?.input?.toLowerCase()))]
                }
            } else {
                return{
                    ...state,
                    searchData: []
                }
            }
            

        default:
            return state;
    }
}