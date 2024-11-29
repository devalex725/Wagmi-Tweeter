import { abi } from "./abi";

const CONTRACT_CONFIG = {
    abi: abi,
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
}

export default CONTRACT_CONFIG;