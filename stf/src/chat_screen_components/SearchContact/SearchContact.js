import './SearchContact.css'

const SearchContact = (props) => {
    const onChange = (e) => {
        props.setInputValue(e.target.value);
        props.onChangeInput(e.target.value);
    };

    return (
        <div id="SearchContactBox" className="d-flex justify-content-center align-items-center">
            <input
                type="text"
                placeholder="search contact here..."
                value={props.value}
                onChange={onChange}
                className={props.value ? "searchContactInput nonEmpty" : "searchContactInput"}
            />
        </div>
    );
};

export default SearchContact;