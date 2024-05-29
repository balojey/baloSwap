import AppBar from "@/component/AppBar";
import SwapBox from "@/component/SwapBox";
import { Flex } from "@radix-ui/themes";
import ConnectWalletNotice from "@/component/ConnectWalletNotice";

export default function Home() {
  return (
    <Flex gap="3" direction="column" justify="between">
      <AppBar />
      <SwapBox />
      <ConnectWalletNotice />
    </Flex>
  );
}
