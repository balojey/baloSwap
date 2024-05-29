import { Box, Flex } from "@radix-ui/themes";
import From from "./From";
import To from "./To";
import SwapButton from "./SwapButton";

export default function SwapBox() {
    return (
        <Box
            p="3"
            m="3"
            style={{ backgroundColor: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}
        >
            <Flex gap="7" direction="column" align="center">
                <From />
                <hr />
                <To />
                <SwapButton />
            </Flex>
        </Box>
    )
}