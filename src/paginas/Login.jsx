// src/paginas/Login.jsx
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const navigate=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        // Redirigir a la ventana principal después del login
        navigate("/layouts/principal");
    }

return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-warning bg-gradient">
    <Card className="p-4 shadow-lg" style={{ width: "24rem", borderRadius: "12px" }}>
        <h3 className="text-center mb-4">🔑 Iniciar Sesión</h3>
        <Form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"></input>
                <label htmlFor="floatingInput">Usuario</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"></input>
                <label htmlFor="floatingPassword">Contraseña</label>
            </div>
            <Button variant="primary" type="submit" className="w-100 mt-3">
                Ingresar
            </Button>
        </Form>
    </Card>
    </div>
);
}