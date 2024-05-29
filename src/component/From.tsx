import { Flex, Text, Strong, DropdownMenu, Button, TextField } from "@radix-ui/themes"

export default function From() {
    return (
        <Flex gap="5" direction="column">
            <Text size="5">From</Text>
            <Flex gap="9">
                <Flex gap="5" direction="column">
                    <Strong>Token</Strong>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button variant="soft">
                                Options
                                <DropdownMenu.TriggerIcon />
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            <DropdownMenu.Item>USDC</DropdownMenu.Item>
                            <DropdownMenu.Item>USDC</DropdownMenu.Item>
                            <DropdownMenu.Item>MATIC</DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Flex>
                <Flex gap="5" direction="column">
                    <Strong>Amount</Strong>
                    <TextField.Root placeholder="Enter amount...">
                        <TextField.Slot />
                    </TextField.Root>
                </Flex>
            </Flex>
        </Flex>
    )
}