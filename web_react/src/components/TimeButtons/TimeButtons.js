const TimeButtons = (props) => {
    const { buttonId, handleButtonId, buttonLabels } = props;
    return (
        <>
            {buttonLabels.map((item, index) => {
                return (
                    <button onClick={() => handleButtonId(buttonId[index])} className="button">
                        {buttonLabels[index]}
                    </button>
                );
            })}
        </>
    );
};

export default TimeButtons;
