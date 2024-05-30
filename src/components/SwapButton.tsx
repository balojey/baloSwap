import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { Button, Spinner } from "@radix-ui/themes"
import { useState } from "react"

export default function SwapButton({ aptos, swapAmount, convertedAmount, fromToken, toToken }) {

    const {
        account,
        signAndSubmitTransaction,
    } = useWallet()
    const [swapLoading, setSwapLoading] = useState(false)

    // Suggested code may be subject to a license. Learn more: ~LicenseLog:1672269811.
    const swap = async () => {
        setSwapLoading(true)
        console.log(typeof BigInt(Math.round(convertedAmount)))
        const response = await signAndSubmitTransaction({
            sender: account?.address,
            data: {
                function: "0xc7efb4076dbe143cbcd98cfaaa929ecfc8f299203dfff63b95ccb6bfe19850fa::router::swap_exact_input",
                typeArguments: [fromToken.address, toToken.address],
                functionArguments: [swapAmount * 100000000, Math.trunc(convertedAmount * 100000000)],
            },
        });
        console.log(2)
        // if you want to wait for transaction
        try {
            await aptos.waitForTransaction({ transactionHash: response.hash });
        } catch (error) {
            console.error(error);
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