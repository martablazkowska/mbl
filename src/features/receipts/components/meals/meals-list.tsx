import { ReceiptTypes } from "../../data/receipt-types"

export const MealsList = () => {

    const mealTypes = ReceiptTypes;

    return (
        <ul>
            {mealTypes.map((meal) => (
                <li key={meal.id}>{meal.name}</li>
                )
            )}
        </ul>
    )
}