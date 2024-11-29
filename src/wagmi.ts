import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    metaMask({
      dappMetadata: {
        name: "MetaMask SDK + Wagmi Tutorial",
        url: "https://wagmi.io",
        iconUrl: "https://wagmi.io/favicon.ico",
      },
    }),
  ],
  transports: {
    [sepolia.id]: http(`https://sepolia.infura.io/v3/50da85c6296c41a3a730d08c196f8e3e`),
    [mainnet.id]: http(`https://mainnet.infura.io/v3/50da85c6296c41a3a730d08c196f8e3e`),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
