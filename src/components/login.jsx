import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import useAuth from './useAuth'; // Ajuste o caminho conforme necessário
import { useNavigate } from 'react-router-dom';

const FormularioLogin = () => {
    const [email, setEmail] = useState("");
    const [cliente_senha, setClienteSenha] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (email.trim() === "" || cliente_senha.trim() === "") {
            setError("Preencha todos os campos!");
            return;
        }
    
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, cliente_senha })
            });
    
            if (response.status === 200) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                login(); // Chama o método login do AuthProvider
                navigate('/agendamento'); // Redireciona para a página de agendamentos
            } else {
                setError("Usuário ou senha inválidos!");
            }
        } catch (error) {
            setError("Erro ao tentar logar. Tente novamente mais tarde.");
        }
    };

    const formularioStyle = {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    };

    const colStyle = {
        maxWidth: '400px',
    };

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <section style={formularioStyle}>
                <div className="container py-5">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6" style={colStyle}>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image"/>
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1" style={colStyle}>
                            <form onSubmit={handleSubmit}>
                                <div className="form-outline mb-4">
                                    <input type="text" id="username" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <label className="form-label" htmlFor="username">Usuário</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="password" id="senha" className="form-control form-control-lg" value={cliente_senha} onChange={(e) => setClienteSenha(e.target.value)} />
                                    <label className="form-label" htmlFor="senha">Senha</label>
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
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
            <footer className="text-center mt-4">Todos os direitos reservados.</footer>
        </>
    );
};

export default FormularioLogin;
