import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { uploadImage } from '../API/API_Access';
import { TextField } from "@material-ui/core";

const FormBeforeUpload = (props) => {
  const { register, handleSubmit } = useForm();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [copyright, setCopyright] = useState();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("id_user", 1);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("copyright", copyright);
    formData.append("file", data.file[0]);

    uploadImage(formData).then((response) => props.checkUpload(response));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Télécharger vos images</h3>

      <div class="form-group">
        <div>
          <TextField
            label="Titre"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <label for="description">Description</label>
        <div className="description">
          <textarea
            class="form-control"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        
      </div>

      <label>Voulez vous mettre un copyright à votre photo ?</label>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio1"
          value="1"
          onChange={(e) => setCopyright(e.target.value)}
          required
        />
        <label class="form-check-label" for="inlineRadio1">
          Oui
        </label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio2"
          value="0"
          onChange={(e) => setCopyright(e.target.value)}
          required
        />
        <label class="form-check-label" for="inlineRadio2">
          Non
        </label>
      </div>
      <br />
      <input type="file" name="file" {...register("file")} required />
      <button type="submit" className="btn btn-dark btn-lg btn-block">
        Suivant
      </button>
    </form>
  );
};

export default FormBeforeUpload;