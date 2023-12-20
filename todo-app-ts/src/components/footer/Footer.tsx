import { FilterValue } from "../../types"
import { Filters } from "../filters/Filters"

interface Props {
    activeCount: number
    completedCount: number
    filterSelected: FilterValue
    handleFilterChange: (filter: FilterValue) => void
    onClearCompleted: () => void
}

export const Footer: React.FC<Props> = ({ 
    onClearCompleted, 
    activeCount = 0, 
    completedCount = 0,
    filterSelected,
    handleFilterChange
    }) => {
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{activeCount}</strong> tareas pendientes
            </span>

            <Filters filterSelected={filterSelected} onFilterChange={handleFilterChange} />

            {
                completedCount > 0 && (
                    <button 
                    className="clear-completed"
                    onClick={onClearCompleted} >
                        🗑️ Tareas listas
                    </button>
                )
            }
        </footer>
    )
}