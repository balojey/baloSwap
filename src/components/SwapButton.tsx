import { Button, Spinner } from "@radix-ui/themes"

export default function SwapButton() {
    return (
        <Button size="4" variant="classic">
            <Spinner loading={false}>
                Swap
            </Spinner>
        </Button>
    )
}