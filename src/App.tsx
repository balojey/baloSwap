import AppBar from "./components/AppBar";
import SwapBox from "./components/SwapBox";
import { Flex } from "@radix-ui/themes";
import ConnectWalletNotice from "./components/ConnectWalletNotice";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

function App() {
  const {
    connected,
  } = useWallet();

  return (
    <Flex gap="3" direction="column" justify="between">
      <AppBar />
      {
        connected
        ? <SwapBox />
        : <ConnectWalletNotice />
      }
    </Flex>
  )
}

export default App
