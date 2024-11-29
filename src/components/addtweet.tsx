import { useEffect, useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import CONTRACT_CONFIG from "../config/contract";
import useTransactionStore from "../store/transaction";

const AddTweetPanel = () => {
    const { setAddTweetSuccessFlag } = useTransactionStore();
    const [newContent, setNewContent] = useState<string>('');
    const { writeContract, data: hash } = useWriteContract();

    const handleAddNewTweet = async () => {
        if (newContent == '') return;

        await writeContract({
            ...CONTRACT_CONFIG,
            functionName: 'createTweet',
            args: [newContent],
        })

        setNewContent('');
    }

    const {
        data: receipt,
        isLoading: isPendingAddingTweet,
        isSuccess
    } = useWaitForTransactionReceipt({
        hash,
    })

    useEffect(() => setAddTweetSuccessFlag(isSuccess), [isSuccess]);

    return (
        <div>
            <h2 className="font-extrabold text-xl">Add an Item</h2>
            <input type="text" value={newContent} onChange={(e) => setNewContent(e.target.value)} className="border border-red-300" />

            <button onClick={handleAddNewTweet} className="">
                Add
            </button>
            
            <div>
                {isPendingAddingTweet ? 'Transaction is pending now' : ''}
            </div>

            <div>
                {
                    isSuccess && `Transaction completed! : ${receipt.transactionHash}`
                }
            </div>
        </div>
    )
}

export default AddTweetPanel;