import "./Button.css"

const Button = () => {
    return (
        <div className="buttons">
            <button className="button">Start game</button>
            <button className="button">Step</button>
            <button className="button">Random game</button>
            <button className="button">Clear field</button>
        </div>
    )
}

export default Button;