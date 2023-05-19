import './BackgroundCircles.css'

function BackgroundCircles({circleId}) {
    return (
        <div className="container-fluid text-center">
            <div className="row">
                <div id={circleId} className="col-lg-4 position-fixed"></div>
            </div>
        </div>);
}

export default BackgroundCircles;