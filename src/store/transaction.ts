import { create } from "zustand"

interface TransactionStore {
    addTweetSuccessFlag: boolean,
    setAddTweetSuccessFlag: (b: boolean) => void
}

const useTransactionStore = create<TransactionStore>((set, get) => ({
    addTweetSuccessFlag: false,
    setAddTweetSuccessFlag: (v: boolean) => {
        set({ addTweetSuccessFlag: v });
    }
}))

export default useTransactionStore;