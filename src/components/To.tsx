import { Flex, Text, Strong, Box, DropdownMenu, Button, Avatar, TextField } from "@radix-ui/themes"
import { AptoswapClient } from "@vividnetwork/swap-sdk";

export default function To({ tokens, toToken, fromToken, swapAmount, setConvertedAmount, convertedAmount, setToToken }) {
    return (
        <Flex gap="5" direction="column">
            <Text size="5">To</Text>
            <Flex gap="9">
                <Flex gap="5" direction="column">
                    <Strong>Token</Strong>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button variant="soft" size="4">
                                {
                                    toToken
                                    ?<Box py="3">
                                        <Avatar
                                            src={toToken.logoURI}
                                            fallback="A"
                                            size="1"
                                        />
                                        <Text>{toToken.symbol}</Text>
                                    </Box>
                                    : "Select Token"
                                }
                                <DropdownMenu.TriggerIcon />
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            {tokens.map((token, index) => (
                                <DropdownMenu.Item key={index} onSelect={async () => {
                                    setToToken(token)

                                    const aptoswap = (await AptoswapClient.fromHost("https://aptoswap.net"))!;
                                    const { pools } = await aptoswap.getCoinsAndPools();
                                    const pool = pools.filter(p => p.type.xTokenType.name === fromToken.name && p.type.yTokenType.name === toToken.name)[0];
                                    console.log(pool)
                                    if (!pool) return
                                    const amt = pool.getXToYAmount(BigInt(swapAmount * 100000000))
                                    console.log(amt)
                                    setConvertedAmount(Number(amt) / 100000000)
                                }}>
                                    <Avatar
                                        src={token.logoURI}
                                        fallback="A"
                                        size="1"
                                    />
                                    <Text>{token.symbol}</Text>
                                </DropdownMenu.Item>
                            ))}
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Flex>
                <Flex gap="5" direction="column">
                    <Strong>Amount</Strong>
                    <TextField.Root placeholder="" size="3" disabled>
                        <TextField.Slot>{convertedAmount}</TextField.Slot>
                    </TextField.Root>
                </Flex>
            </Flex>
        </Flex>
    )
}