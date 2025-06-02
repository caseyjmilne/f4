export default function ModelHeader({setShowForm, setSelectedModelId}) {

    return(
        <header className="model-section-header">
            <h2 className="model-section-title">F4 Models</h2>
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