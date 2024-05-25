import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Agendamento = () => {
  const { register, handleSubmit, reset } = useForm();
  const [aviso, setAviso] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  const salvar = async (campos) => {
    try {
      const response = await api.post("agendamento", campos);
      setAviso("Agendamento realizado com sucesso!");
      reset();
    } catch (error) {
      setAviso("Erro ao realizar agendamento!");
    }
  };

  return (
    <div className="container-fluid bg-dark text-light min-vh-100 d-flex align-items-center">
      <div className="container p-5 bg-light text-dark rounded">
        <h4 className="fst-italic mb-3">Agendamento</h4>
        <form onSubmit={handleSubmit(salvar)}>
          <div className="input-group mb-3">
            <input
              className="form-control"
              type="search"
              placeholder="Pesquisar"
              aria-label="Pesquisar"
            />
            <button className="btn btn-outline-success" type="submit">
              Pesquisar
            </button>
          </div>
          <div className="input-group mb-3">
            <select className="form-select" aria-label="Default select example">
              <option selected>Selecione o serviço</option>
              <option value="jardinagem">Jardinagem</option>
              <option value="pedreiro">Pedreiro</option>
              <option value="eletricista">Eletricista</option>
            </select>
          </div>
          <div className="input-group mb-3">
            <select className="form-select" aria-label="Default select example">
              <option selected>Selecione o Prestador</option>
              <option value="1">Joãozinho</option>
              <option value="2">Mariazinha</option>
              <option value="3">Pedrinho</option>
            </select>
          </div>
          <h5 className="fst-italic mb-3">Selecione a data e hora</h5>
          <div className="input-group mb-3">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecione a data"
              className="form-control"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="time"
              className="form-control"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Agendar</button>
        </form>
        <div className="alert mt-3">{aviso}</div>
      </div>
    </div>
  );
};

export default Agendamento;
