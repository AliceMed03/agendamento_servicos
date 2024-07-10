import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import { useState } from "react";

const Cadastrar_prestador = () => {
  const { register, handleSubmit,reset } = useForm();
  const [aviso, setAviso] = useState("");

  const salvar = async (campos) => {
    try {
      const response = await api.post("/prestador", campos);
      setAviso(`Prestador cadastrado com sucesso!"`);
      reset();
    } catch (error) {
      setAviso("Erro ao cadastrar prestador!");
    }
  };

  return (
    <div className="container-fluid bg-dark text-light min-vh-100 d-flex align-items-center">
      <div className="container p-5 bg-light text-dark rounded">
        <h4 className="fst-italic mb-3">Cadastrar Prestador</h4>
        <form onSubmit={handleSubmit(salvar)}>
          <div class="row g-3">
            <div className="form-group" class="col-sm-6">
              <label htmlFor="nome">Nome:</label>
              <input type="text" className="form-control" id="prestador_nome" required autoFocus {...register("prestador_nome")}/>
            </div>
            <div className="form-group" class="col-sm-6">
              <label htmlFor="cpf">CPF:</label>
              <input type="text" className="form-control" id="prestador_cpf" required autoFocus {...register("prestador_cpf")}/>
            </div>
            <div className="form-group mt-2" class="col-sm-6">
              <label htmlFor="email">Email:</label>
              <input type="email" className="form-control" id="prestador_email" required {...register("prestador_email")}/>
            </div>
            <div className="form-group mt-2" class="col-sm-6">
              <label htmlFor="status">Senha:</label>
              <input type="password" className="form-control" id="prestador_senha" required {...register("prestador_senha")}/>
            </div>
            <div className="form-group mt-2" class="col-sm-6">
              <label htmlFor="razao_social">Razão Social:</label>
              <input type="text" className="form-control" id="prestador_razaoSocial"  {...register("prestador_razaoSocial")}/>
            </div>
            {/* <div className="form-group mt-2" class="col-sm-6">
              <label htmlFor="nome_fantasia">Nome Fantasia:</label>
              <input type="text" className="form-control" id="prestadorNomeFantasia" {...register("prestadorNomeFantasia")} />
            </div> */}
            <div className="form-group mt-2" class="col-sm-6">
              <label htmlFor="cnpj">CNPJ:</label>
              <input type="text" className="form-control" id="prestador_cnpj" {...register("prestador_cnpj")}/>
            </div>
            {/* <div className="form-group mt-2">
            <label htmlFor="nome">Telefone:</label>
            <input type="text" className="form-control" id="prestadorTelefone" required {...register("prestadorTelefone")}/>
          </div> */}
          </div>
                   
          <input type="submit" className="btn btn-primary mt-3" value="Enviar"/>
          <input type="reset" className="btn btn-danger mt-3 ms-3" value="Limpar"/>
        </form>
        <div className="alert mt-3">{aviso}</div>
      </div>
    </div>
  );
};

export default Cadastrar_prestador;
