import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { Button, Spinner } from "@radix-ui/themes"
import { AptoswapClient, TransactionOperation } from "@vividnetwork/swap-sdk"
import { useState } from "react"

export default function SwapButton({ aptos }) {

    const { account } = useWallet()
    const [swapLoading, setSwapLoading] = useState(false)

    // Suggested code may be subject to a license. Learn more: ~LicenseLog:1672269811.
    const swap = async () => {
        setSwapLoading(true)
        const aptoswap = (await AptoswapClient.fromHost("https://aptoswap.net"))
        const packageAddr = aptoswap?.getPackageAddress()
        const { pools, coins } = await aptoswap?.getCoinsAndPools()

        const pool = pools.filter(p => 
            p.type.xTokenType.name === `${packageAddr}::pool::TestToken` &&
            p.type.yTokenType.name === "0x1::aptos_coin::AptosCoin"
        )[0]

        if (pool === undefined) {
            // console.log(packageAddr)
            // pools.filter(p => console.log(p.type.xTokenType.name))
            // console.log("========================================")
            // pools.filter(p => console.log(p.type.yTokenType.name))
            // console.log(coins)
            setSwapLoading(false)
            return
        }

        const operation: TransactionOperation.Swap = {
            operation: "swap",
            pool: pool,
            direction: "reverse",
            amount: BigInt("100000")
        }

        const result = await aptoswap?.execute(operation, account, { maxGasAmount: BigInt("4000") })
        setSwapLoading(false)
        console.log(result?.hash, " ", result?.success)
    }

    return (
        <Button size="4" variant="classic" onClick={async () => await swap()}>
            <Spinner loading={swapLoading}>
                Swap
            </Spinner>
        </Button>
    )
}