import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import { useState } from "react";

const Cadastrar_Usuario = () => {
  const { register, handleSubmit, reset } = useForm();
  const [aviso, setAviso] = useState("");

  const salvar = async (campos) => {
    try {
      // const clienteData = {
      //   clienteNome: campos.clienteNome,
      //   clienteCpf: campos.clienteCpf,
      //   clienteDataNascimento: campos.clienteDataNascimento,
      //   clienteEmail: campos.clienteEmail,
      //   clienteSenha: campos.clienteSenha
      // }
      const response = await api.post("/cliente", campos);
      setAviso("Usuário cadastrado com sucesso!");
      reset();
    } catch (error) {
      setAviso("Erro ao cadastrar usuário!");
    }
  };

  return (
    <div className="container-fluid bg-dark text-light min-vh-100 d-flex align-items-center">
      <div className="container p-5 bg-light text-dark rounded">
        <h4 className="fst-italic mb-3">Cadastrar Usuário</h4>
        <form onSubmit={handleSubmit(salvar)}>
        <div className="form-group mt-2">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              className="form-control"
              id="cliente_nome"
              required
              {...register("cliente_nome")}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="nome">CPF:</label>
            <input
              type="text"
              className="form-control"
              id="cliente_cpf"
              required
              {...register("cliente_cpf")}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="nome">Data de Nascimento:</label>
            <input
              type="date"
              className="form-control"
              id="cliente_dataNascimento"
              required
              {...register("cliente_dataNascimento")}
            />
          </div>
          {/* <div className="form-group mt-2">
            <label htmlFor="nome">Telefone:</label>
            <input
              type="text"
              className="form-control"
              id="clienteTelefone"
              required
              {...register("clienteTelefone")}
            />
          </div> */}
          <div className="form-group mt-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              {...register("email")}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="status">Senha:</label>
            <input
              type="password"
              className="form-control"
              id="cliente_senha"
              required
              {...register("cliente_senha")}
            />
          </div>

          <input
            type="submit"
            className="btn btn-primary mt-3"
            value="Enviar"
          />
          <input
            type="reset"
            className="btn btn-danger mt-3 ms-3"
            value="Limpar"
          />
        </form>
        <div className="alert mt-3">{aviso}</div>
      </div>
    </div>
  );
};

export default Cadastrar_Usuario;
