import axios from "axios";
import IDataList from "../modules/IDataList";

export const getItemsData = () => {
    return axios.get<IDataList[]>(' http://localhost:4001/items').then(response => response.data);
}

export const pushData = (newExpenses: Omit<IDataList, "id">) => {
    return axios.post<IDataList>(
        `http://localhost:4001/items`,
        newExpenses).then(response => response.data)
}
