import AppBar from "./components/AppBar";
import SwapBox from "./components/SwapBox";
import { Flex } from "@radix-ui/themes";
import ConnectWalletNotice from "./components/ConnectWalletNotice";

function App() {

  return (
    <Flex gap="3" direction="column" justify="between">
      <AppBar />
      <SwapBox />
      <ConnectWalletNotice />
    </Flex>
  )
}

export default App
