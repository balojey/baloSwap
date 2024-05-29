import { Box, Flex, Heading, Text, Button } from "@radix-ui/themes"
import ConnectWalletButton from "./ConnectWalletButton"

export default function AppBar() {
    return (
        <Box
            p="3"
        >
            <Flex gap="3" justify="between" align="center">
                <Box>
                    <Heading m="2" size="6">baloSwap</Heading>
                </Box>
                <Flex gap="4" align="center">
                    <Box>
                        <Text>Account Address</Text>
                    </Box>
                    <Box>
                        <Button color="teal">Disconnect</Button>
                    </Box>
                </Flex>
                <Flex gap="4" align="center">
                    <ConnectWalletButton />
                </Flex>
            </Flex>
        </Box>
    )
}