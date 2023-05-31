import RegisterLoginBlock from '../RegisterLoginBlock/RegisterLoginBlock';
import RegisterCreateAccountBlock from '../RegisterCreateAccountBlock/RegisterCreateAccountBlock';

function RegisterMainScreen() {
    return (
        <div className="container text-center">
            <div className="row">
                <RegisterCreateAccountBlock className="col-lg-8 position-relative" />
                <RegisterLoginBlock className="col-lg-4 position-relative" />
            </div>
        </div>
    );
}

export default RegisterMainScreen;