import { useAccount, useBalance, useDisconnect } from "wagmi";

const AccountInfo = () => {
    const account = useAccount();
    const isConnected = account.status === 'connected';
    const { data: balance } = useBalance({
        address: account.address
    });
    const { disconnect } = useDisconnect();

    return (
        <div>
            <h2 className="font-extrabold text-xl">Account</h2>
            {/* account info */}
            <div>
                Status: {account.status}
                <br />
                Addresses: {JSON.stringify(account.addresses)}
                <br />
                Balance: {isConnected ? `${balance?.formatted} ${balance?.symbol}` : '0 ETH'}
                <br />
                {`ChainId: ${account.chainId} (${account.chain?.name})`}
            </div>

            {isConnected && (
                <button type="button" onClick={() => disconnect()}>
                    Disconnect
                </button>
            )}
        </div>
    )
}

export default AccountInfo;