import './Details.css'

function Details({ DivId, DivText }) {
    return (<div id={DivId} className="col">{DivText}</div>);
}

export default Details;