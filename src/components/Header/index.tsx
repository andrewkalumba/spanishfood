import Logo from "../Logo"

type HeaderProp = {
    title: string
}

const Header = ({ title }: HeaderProp) => {

    return (
        <div className="flex items-center justify-between bg-[#006E90] relative">
            <Logo />
            <h1 className="absolute left-[40%] text-sm md:2xl text-center uppercase">{title}</h1>
        </div>
    )
}
export default Header