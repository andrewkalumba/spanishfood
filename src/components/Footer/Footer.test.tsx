import {render, screen} from "@testing-library/react"
import Footer from "."

test("if it has a footer", () => {
    render(<Footer/>)

    const footerInfo = screen.getByText(/travel Blog/i)
    expect(footerInfo).toBeInTheDocument
})