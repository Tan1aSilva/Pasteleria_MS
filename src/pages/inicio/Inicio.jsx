import App_navbar from "../../components/navbar/navbar";
import { useNavigate } from "react-router-dom";
import estilos from "./inicio.module.css";

function Inicio() {
    const navigate = useNavigate();

    return (
        <>
        <App_navbar/>
        <div className="row">
            <div className="col-12">
                <img className={estilos.imagen} src="/src/assets/img/tipos-de-cremas-en-pastelería.jpg" alt="Imagen Pasteleria" />
            </div>
                
        



        </div>




        </>);
}

export default Inicio;