import React, { useEffect, useState } from "react";
import { analyseImage, getAllCategories, updateDateImage, addCategoriesForImage, addMotsCleForImage } from '../API/API_Access';
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale} from "react-datepicker";
import fr from "date-fns/locale/fr";
import { useHistory } from "react-router-dom";
registerLocale("fr", fr);

const FormAfterUpload = (props) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(true);
  const [dataAnalyse, setDataAnalyse] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [categories, setCategories] = useState([]);
  const [valueForSelect, setValueForSelect] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [listChoice, setListChoice] = useState([]);
  const [mot, setmot] = useState("");
  const history = useHistory();

  useEffect(() => {
    getAllCategories().then((response) => {
      setCategories(response);
    });
    createOptionsForSelect();
    if (loading) {
      analyseImage(props.dataImage.id).then((response) => {
        setDataAnalyse(response.Labels);
        setLoading(false);
      });
    }
  }, [loading]);

  const searchIfPersonDetect = (listDetect) => {
    let result = false;
    dataAnalyse.map((response) => {
      if (response.Name == "Person") {
        result = true;
      }
    });
    return result;
  };

  const createOptionsForSelect = () => {
    console.log(categories)
    categories.map((category) => {
      console.log(category.name)
      valueForSelect.push({
        value: category.name,
        label: category.name,
      });
    });
  };

  const addListChoice = (data) => {
    setListChoice(listChoice.concat(data));
  };

  const removeListChoice = (data) => {
    setListChoice(listChoice.filter((item) => item !== data));
  };

  const getCurrentDate = (date1, separator = "-") => {
    let newDate = date1;
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  };

  const onSubmit = async () => {
    /* Form Data pour envoyer Date */
    const formDataDate = new FormData();
    formDataDate.append("date", getCurrentDate(startDate));
    updateDateImage(props.dataImage.id, formDataDate).then((response) => response);

    /* Form Data pour envoyer liste des catégories */
    const formDataCategories = new FormData();
    let categories = [];
    selectedOption.map((response) => categories.push(response.value));
    formDataCategories.append("categories", categories);
    addCategoriesForImage(
      props.dataImage.id,
      formDataCategories
    ).then((response) => response);
    /* Form Data pour envoyer liste des mots clés */
    const formDataMots = new FormData();
    formDataMots.append("mot", listChoice);
    addMotsCleForImage(props.dataImage.id, formDataMots).then((response) =>
      response
    );
    history.push("/");
  };

  return (
    <div>
      <img src={props.dataImage.link} class="img-fluid" width="20%"/>
      {loading && (
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        {searchIfPersonDetect() && (
          <div class="form-group">
            <label for="date_accord">
              Date d'accord de la personne présente : 
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="P"
              locale="fr"
              required
            />
          </div>
        )}
        {dataAnalyse.length != 0 && (
          <div>
            <div>
              <Select
                isMulti
                name="colors"
                options={valueForSelect}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Sélectionner une / plusieurs catégories"
                onChange={setSelectedOption}
                required
              />
            </div>
            <div class="col-md-12 border">
              <div class="row">
                <div class="col-md-5">
                  Liste des choses détectés sur l'image :
                  {dataAnalyse.map((response) => (
                    <p key={response.Name}>
                      {response.Name} {response.Confidence.toFixed(2)}%
                      {!listChoice.includes(response.Name) && (
                        <div
                          class="border"
                          onClick={() => addListChoice(response.Name)}
                        >
                          Ajouter dans la liste
                        </div>
                      )}
                    </p>
                  ))}
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="input_mot">
                      Ajouter dans la liste un autre mot clé
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="input_mot"
                      id="input_mot"
                      value={mot}
                      onChange={(e) => setmot(e.target.value)}
                    />
                    <div
                      class="border"
                      onClick={() => {
                        addListChoice(mot);
                        setmot("");
                      }}
                    >
                      Ajouter
                    </div>
                  </div>
                  <div className="choice_mot">
                  <lable>Liste des mots clés choisi pour votre image :</lable>
                    {listChoice.map((response) => (
                      <p key={response}>
                        {response}
                        <div
                          class="border"
                          onClick={() => removeListChoice(response)}
                        >
                          Supprimer
                        </div>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <button>Envoyer</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormAfterUpload;