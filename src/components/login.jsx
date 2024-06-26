import { useState } from "react";
import { useAuth } from './AuthProvider'; // Ajuste o caminho conforme necessário
import 'bootstrap/dist/css/bootstrap.min.css';
import { api } from "../config_axios";

const FormularioLogin = () => {
    const [username, setUsername] = useState("");
    const [senha, setSenha] = useState("");
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (username.trim() === "" || senha.trim() === "") {
            alert("Preencha todos os campos!");
            return;
        }
    
        try {
            const response = await api.post("/login", { username, senha });
            if (response.status === 200) {
                login();
            } else {
                alert("Usuário ou senha inválidos!");
            }
        } catch (error) {
            alert("Erro ao tentar logar. Tente novamente mais tarde.");
        }
    };

    const formularioStyle = {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const colStyle = {
        maxWidth: '400px',
    };
    
    return (
        <section style={formularioStyle}>
            <div className="container py-5" style={{height: '100%'}}>
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6" style={colStyle}>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image"/>
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1" style={colStyle}>   
                        <form onSubmit={handleSubmit}>
                            <div className="form-outline mb-4">
                                <input type="text" id="username" className="form-control form-control-lg" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <label className="form-label" htmlFor="username">Usuário</label>
                            </div>
                            <div className="form-outline mb-4">
                                <input type="password" id="senha" className="form-control form-control-lg" value={senha} onChange={(e) => setSenha(e.target.value)} />
                                <label className="form-label" htmlFor="senha">Senha</label>
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg btn-block">Login</button>
                            <div className="mt-3 text-center">
                                <a href="http://localhost:5173/user" className="link-cadastro">Cadastrar Usuário</a>
                                <span className="mx-2">|</span>
                                <a href="http://localhost:5173/prestador" className="link-cadastro">Cadastrar Prestador</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FormularioLogin;
