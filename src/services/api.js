import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en";

const getCoins = async () => {
    const response = await axios.get(BASE_URL);
    return response.data
}

export {getCoins}

//market_cap_asc, market_cap_desc, volume_asc, volume_desc, id_asc, id_desc