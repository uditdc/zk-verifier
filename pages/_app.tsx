import '../styles/app.scss'
import '@celo/react-celo/lib/styles.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { CeloProvider, Alfajores, NetworkNames, SupportedProviders } from '@celo/react-celo'

// Setup Theme
function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;

  return (
    <ChakraProvider>
      <CeloProvider
        networks={[Alfajores]}
        defaultNetwork={NetworkNames.Alfajores}
        dapp={{
          icon: '',
          name: 'ZKWasm Verifier',
          description: 'ZKWasm Verifier',
          url: 'https://bls.dev',
        }}
        connectModal={{
          title: 'Connect your Wallet',
          providersOptions: {
            hideFromDefaults: [
              SupportedProviders.PrivateKey,
              SupportedProviders.CeloExtensionWallet,
              SupportedProviders.Valora,
              SupportedProviders.CoinbaseWallet,
              SupportedProviders.Injected
            ],
            searchable: false
          }
        }}
      >
        <AnyComponent {...pageProps} />
      </CeloProvider>
    </ChakraProvider>
  )
}

export default MyApp
