import './app-header.css';

export default function AppHeader({setShowForm, setSelectedModelId}) {

    return(
        <header className="model-section-header">
            <h2 className="f4-logo-text">F4</h2>
            <button
                className="f4-button"
                onClick={() => {
                        setShowForm(true);
                        setSelectedModelId(0);
                    }
                }
                >
                + Model
            </button>
        </header>
    )

}