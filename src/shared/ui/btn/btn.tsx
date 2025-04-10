import { BtnProps } from "./btn.types"

export const Btn = ({children}:BtnProps) => {
    return (
        <button className="p-2">{children}</button>
    )
}