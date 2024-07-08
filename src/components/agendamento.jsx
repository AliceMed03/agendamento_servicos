import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";

const Agendamento = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [aviso, setAviso] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("00:00");
  const [servicos, setServicos] = useState([]);
  const [prestadores, setPrestadores] = useState([]);
  const [selectedServicosNome, setSelectedServicosNome] = useState("");

  useEffect(() => {
    const fetchServicos = async () => {
        try {
            const response = await api.get("/servicos");
            console.log(response.data);
            setServicos(response.data);
        } catch (error) {
            console.error("Erro ao buscar serviços", error);
        }
    };

    fetchServicos();
}, []);

const buscarPrestadoresPorNomeServico = async (servicosNome) => {
  if (!servicosNome) return;

  try {
      const response = await api.get(`/prestador/search?servicosNome=${servicosNome}`);
      setPrestadores(response.data);
      
  } catch (error) {
      console.error("Erro ao buscar prestadores por nome do serviço", error);
  }
};

const handleServicoChange = (event) => {

  const servicoEncontrado = servicos.find(servicos => servicos.idServicos === parseInt(event.target.value, 10));        
  const servicosNome = servicoEncontrado?.servicosNome;

  setSelectedServicosNome(servicosNome);
  buscarPrestadoresPorNomeServico(servicosNome);
};

const salvar = async (campos) => {
  try {
      // Adiciona os campos agendamento_hora e agendamento_servico_id ao objeto campos
      const camposCompletos = {
          ...campos,
          agendamentoHora: selectedTime,
          servicos:{idServicos: watch("idServicos")}
      };

      const response = await api.post("agendamento", camposCompletos);
      setAviso("Agendamento realizado com sucesso!");
      reset();
  } catch (error) {
      setAviso("Erro ao realizar agendamento!");
  }
};


  return (
    <>
      <Helmet>
                  <title>Agendamento</title>
      </Helmet>
        <div className="container-fluid bg-dark text-light min-vh-100 d-flex align-items-center">
          <div className="container p-5 bg-light text-dark rounded">
            <h4 className="fst-italic mb-3">Agendamento</h4>
            <form onSubmit={handleSubmit(salvar)}>
              <div className="input-group mb-3">
              <input
                className="form-control"
                type="search"
                placeholder="Serviços"
                aria-label="Serviços"
                {...register("servicoNome")}
              />
              <button className="btn btn-outline-success" type="button" onClick={() => buscarPrestadoresPorNomeServico(watch("servicoNome"))}>Pesquisar</button>
              </div>
              <select
              className="form-select"
              aria-label="Default select example"
              {...register("idServicos")}
              defaultValue=""
              onChange={handleServicoChange}
              >
              <option value="" disabled>Selecione um serviço</option>
              {servicos.map(servicos => (
              <option key={servicos.idServicos} value={servicos.idServicos}>{servicos.servicosNome}</option>
              ))}
              </select>
              <br />
              <select className="form-select" aria-label="Prestadores" {...register("idPrestador")} defaultValue="" disabled={!selectedServicosNome}>
                <option value="" disabled>Selecione um prestador</option>
                {prestadores.map((prestador) => (
                  <option key={prestador.idPrestador} value={prestador.idPrestador}>{prestador.prestadorNome}</option>
                ))}
              </select>
              <br />
              <div>
                <label>Escolha a data que você deseja agendar o Serviço:</label>
                <br />
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                />
              </div>
              <br />
              <h6>Selecione um horário:</h6>
              <div className="input-group mb-3">
                <input
                  type="time"
                  className="form-control"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
              <br />
              <button type="submit" className="btn btn-primary">Agendar</button>
          </form>
          <div className="alert mt-3">{aviso}</div>
        </div>
      </div>
    </>
  );
};

export default Agendamento;
