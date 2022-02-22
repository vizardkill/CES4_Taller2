import axios from "axios";
import { useCallback, useState, useEffect } from "react";

export const useGetBaraja = () => {
    const [objBaraja, setObjBaraja] = useState();

    const getData = useCallback(async () => {
        return await axios({
            baseURL: "https://deckofcardsapi.com/",
            url: "https://deckofcardsapi.com/api/deck/new/shuffle/",
            params: {
                deck_count: 1,
            },
        }).then((res) => {
            setObjBaraja(res.data);
        });
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    return {
        objBaraja,
    };
};
