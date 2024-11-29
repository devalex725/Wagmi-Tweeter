import { useAccount, useReadContract } from "wagmi";
import CONTRACT_CONFIG from "../config/contract";
import useTransactionStore from "../store/transaction";
import { useEffect } from "react";

const TweetListPanel = () => {
    const account = useAccount();
    const { addTweetSuccessFlag } = useTransactionStore();
    const { data: tweetList, refetch } = useReadContract({
        ...CONTRACT_CONFIG,
        functionName: 'getAllTweets',
        account: account.address,
    });
    
    useEffect(() => {
        if(addTweetSuccessFlag){
            // refetch after adding a tweet
            refetch();  
        }
    }, [addTweetSuccessFlag]);

    return (
        <div>
            <h2 className="font-extrabold text-xl">ItemList in SmartContract</h2>
            {
                tweetList?.map((tweet, index) => <div key={index}>
                    <br />
                    <div>Author: {tweet.author}</div>
                    <div>Content: {tweet.content}</div>
                    <div>CreatedAt: {new Date(Number(tweet.timestamp) * 1000).toLocaleString()}</div>
                </div>
                )
            }
        </div>
    )
}

export default TweetListPanel;