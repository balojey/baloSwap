import { Flex, Text, Strong, Box, DropdownMenu, Button, TextField, Avatar } from "@radix-ui/themes"

export default function To({ tokens, selectedToken, setSelectedToken, convertedAmount }) {
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
                                    selectedToken
                                    ?<Box py="3">
                                        <Avatar
                                            src={selectedToken.logoURI}
                                            fallback="A"
                                        />
                                        <Text>{selectedToken.symbol}</Text>
                                    </Box>
                                    : "Select Token"
                                }
                                <DropdownMenu.TriggerIcon />
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            {tokens.map((token, index) => (
                                <DropdownMenu.Item key={index} onSelect={() => {
                                    setSelectedToken(token)
                                }}>
                                    <Avatar
                                        src={token.logoURI}
                                        fallback="A"
                                    />
                                    <Text>{token.symbol}</Text>
                                </DropdownMenu.Item>
                            ))}
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Flex>
                <Flex gap="5" direction="column">
                    <Strong>Amount</Strong>
                    <TextField.Root placeholder={convertedAmount} size="3" disabled>
                        <TextField.Slot />
                    </TextField.Root>
                </Flex>
            </Flex>
        </Flex>
    )
}