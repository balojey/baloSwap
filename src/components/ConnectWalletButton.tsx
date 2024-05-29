import { Button, Box, Spinner, Text } from "@radix-ui/themes"
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { PetraWalletName } from "petra-plugin-wallet-adapter";

export default function ConnectWalletButton() {
    const {
        connect,
        isLoading,
      } = useWallet();

    const onConnect = async (walletName: any) => {
        await connect(walletName);
    };

    return (
        <Box>
            <Button color="blue" onClick={
                () => onConnect("Nightly")
            }>
                <Spinner loading={isLoading}>
                    Connect Nightly Wallet
                </Spinner>
            </Button>
            <Text> - or - </Text>
            <Button color="pink" onClick={
                () => onConnect(PetraWalletName)
            }>
                <Spinner loading={isLoading}>
                    Connect Petra Wallet
                </Spinner>
            </Button>
        </Box>
    )
}