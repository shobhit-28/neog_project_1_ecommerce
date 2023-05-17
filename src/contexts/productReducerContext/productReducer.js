import { types } from './types';

export const ProductReducer = (state, action) => {
    const {
        SEARCH
    } = types

    switch (action.type) {
        case SEARCH:
            console.log({
                ...state,
                searchData: [
                    ...action?.payload?.data?.filter(({ title }) => title.slice(0, action?.payload?.input.length).toLowerCase() === action?.payload?.input),
                    ...action?.payload?.data?.filter(({ title }) => title.slice(0, action?.payload?.input.length).toLowerCase() !== action?.payload?.input)
                        ?.filter(({ title }) => title.toLowerCase()?.includes(action?.payload?.input?.toLowerCase()))]
            });
            return {
                ...state,
                searchData: [
                    ...action?.payload?.data?.filter(({ title }) => title.slice(0, action?.payload?.input.length).toLowerCase() === action?.payload?.input),
                    ...action?.payload?.data?.filter(({ title }) => title.slice(0, action?.payload?.input.length).toLowerCase() !== action?.payload?.input)
                        ?.filter(({ title }) => title.toLowerCase()?.includes(action?.payload?.input?.toLowerCase()))]
            }

        default:
            return state;
    }
}