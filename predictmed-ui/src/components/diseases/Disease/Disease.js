import {useNavigate} from "react-router-dom";
import {BodyComponent} from "reactjs-human-body"
                                                                                                                                                                                                        
import css from "./Disease.module.css";

const splitAndConcat = (name) => {
    const substrings = name.split(/[^a-zA-Z]/).filter(Boolean);
    return substrings.join(' ').replace(/^(.)/, (match, firstLetter) => firstLetter.toUpperCase())
}

const Disease = ({disease}) => {
    console.log(disease)
    const {
        name, photo, fields, createdAt, _id, partsOfTheBody, type, description, diseases } = disease;

    const exampleParams = partsOfTheBody.reduce((acc, part) => ({...acc, [part]: {selected: true}}), {});
    const formattedName = splitAndConcat(name);
    const year = new Date(createdAt).getFullYear();
    const navigate = useNavigate();

    return (
        <div>
            <div className={css.main_card}>
                <div className={css.card_left}>
                    <div className={css.card_details}>
                        <h1>{`${formattedName} prediction`}</h1>
                        <div className={css.card_cat}>
                            <p className={css.PG}>{fields.length}</p>
                            <p className={css.year}>{year}</p>
                            {diseases && (
                                <div>
                                    {diseases.map((d, idx) => (
                                        <p className={css.genre} key={idx}>{d}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                        <p className={css.disc}>{description}</p>
                        <div className={css.socialBtn}>
                                <BodyComponent partsInput={exampleParams}/>
                        </div>
                    </div>
                </div>
                <div className={css.card_right} onClick={() => navigate(`${_id}`)}>
                    <div className={css.img_container}>
                        <img src={photo} alt={name}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {Disease};