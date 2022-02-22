import axios from "axios";
import { useCallback } from "react";

export const useGetCard = () => {
    const getData = useCallback(async (id) => {
        return await axios({
            baseURL: "https://deckofcardsapi.com/",
            url: `/api/deck/${id}/draw/`,
            params: {
                count: 2,
            },
        }).then((res) => {
            return res.data;
        });
    }, []);

    return {
        getData,
    };
};
