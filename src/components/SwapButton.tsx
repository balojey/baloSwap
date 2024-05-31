import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { Button, Spinner } from "@radix-ui/themes"
import { useState } from "react"
import { AptoswapClient } from "@vividnetwork/swap-sdk"
import { AptosAccount } from "aptos"

export default function SwapButton({ aptos, swapAmount, convertedAmount, fromToken, toToken }) {

    const {
        account,
        signAndSubmitTransaction,
    } = useWallet()
    const [swapLoading, setSwapLoading] = useState(false)

    // Suggested code may be subject to a license. Learn more: ~LicenseLog:1672269811.
    const swap = async () => {
        setSwapLoading(true)

        // const aptoswap = (await AptoswapClient.fromHost("https://aptoswap.net"))!;
        // const packageAddr = aptoswap.getPackageAddress();

        // const exp = Math.floor(Date.now() / 1000) + 60 * 10
        // console.log(exp)
        console.log(fromToken, toToken)
        // const response = await signAndSubmitTransaction({
        //     sender: account?.address,
        //     data: {
        //         function: `${packageAddr}::pool::swap_y_to_x`,
        //         // "0xc7efb4076dbe143cbcd98cfaaa929ecfc8f299203dfff63b95ccb6bfe19850fa::router::swap_exact_input",
        //         typeArguments: [toToken.name, fromToken.name],
        //         functionArguments: [BigInt(swapAmount * 100000000), BigInt(Math.trunc(convertedAmount * 100000000))],
        //     },
        //     options: {
        //         expireTimestamp: exp,
        //     }
        // });

        // const act = new AptosAccount(account.address)

        // if you want to wait for transaction
        try {
            await aptos.waitForTransaction({ transactionHash: response.hash });
            console.log("Transaction confirmed");
        } catch (error) {
            console.error(error);
            setSwapLoading(false)
            return
        }
        setSwapLoading(false)
    }

    return (
        <Button size="4" variant="classic" onClick={async () => await swap()}>
            <Spinner loading={swapLoading}>
                Swap
            </Spinner>
        </Button>
    )
}