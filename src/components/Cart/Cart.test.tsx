import { fireEvent, render, screen } from "@testing-library/react"
import Cart from "./"

describe("testing if the cart functions as required", () => {
    const mockData = { name: "pasta", price: 10, quantity: 6 }

    beforeEach(() => {
        render(<Cart
            items={[mockData]}
            onRemove={() => { }}
            onIncrease={() => { }}
            onDecrease={() => { }}
            subtotal={0}
            tax={0}
            shipping={0}
            total={0}
            onCheckout={() => { }}
        />)
    })

    test("test the button functionality", () => {
        const cartInfo = screen.getAllByRole("button")
        expect(cartInfo.length).toBeGreaterThan(0)
    })

    test("if there is the cart icon", () => {
        const cartIcon = screen.getByTestId("icon")
        expect(cartIcon).toBeInTheDocument()
    })

    test("If there are items in the cart ", () => {
        const itemsInCart = screen.getByText("6")
        expect(itemsInCart).toBeInTheDocument()
    })

    test("If the cart is empty", () => {
        const emptyCart = screen.queryByText("0")
        expect(emptyCart).not.toBeInTheDocument()
    })

    test("Shows the cart heading when open", () => {
        fireEvent.click(screen.getByTestId("icon"))

        const subTitle = screen.getByRole("heading", { level: 3 })
        expect(subTitle).toBeInTheDocument()
    })
})

test("Whether the cart is empty", () => {

    render(<Cart
        items={[]}
        onRemove={() => { }}
        onIncrease={() => { }}
        onDecrease={() => { }}
        subtotal={0}
        tax={0}
        shipping={0}
        total={0}
        onCheckout={() => { }}
    />)

    fireEvent.click(screen.getByTestId("icon"))

    const emptyCart = screen.getByText(/Your cart is empty./i)
    expect(emptyCart).toBeInTheDocument()
})


