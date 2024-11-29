import { useConnect } from "wagmi";

const Connectors = () => {
    const { connectors, connect, status, error } = useConnect()

    return (
        <div>
            <h2 className="font-extrabold text-xl">Connect Wallet</h2>
            <div className="flex gap-[16px] ">
                {connectors.map((connector) => (
                    <div
                        key={connector.uid}
                        onClick={() => connect({ connector })}
                        className="flex items-center justify-center gap-[8px] border border-gray-500 px-[12px] py-[4px] cursor-pointer rounded-[10px]"
                    >
                        <img src={connector.icon} width={16} height={16} />
                        {connector.name}
                    </div>
                ))}
            </div>
            <div>Status: <span className="italic font-bold"> {status}</span></div>
            <div>{error?.message}</div>
        </div>
    )
}

export default Connectors;