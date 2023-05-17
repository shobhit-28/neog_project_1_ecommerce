import { useContext } from "react"
import { DataContext } from "../contexts/dataContext"

export const HomePage = () => {
    const {responseData} = useContext(DataContext);
    console.log(responseData);
    return (
        <h1>Home</h1>
    )
}