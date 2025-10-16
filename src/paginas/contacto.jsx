import React, { useState } from "react";
import "./contacto.css";


const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
  });

  const [respuesta, setRespuesta] = useState("");

  // Maneja cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Envía datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/contacto/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setRespuesta("Mensaje enviado correctamente. ID: " + data.id);
        setFormData({ nombre: "", correo: "", telefono: "", mensaje: "" });
      } else {
        setRespuesta("Error al enviar el mensaje.");
      }
    } catch (error) {
      console.error(error);
      setRespuesta("Error al enviar el mensaje.");
    }
  };

  return (
    <div className="contacto-container" id="contacto">
      <h2>Contacto</h2>
      <form onSubmit={handleSubmit} className="contacto-form">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={formData.correo}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
        />
        <textarea
          name="mensaje"
          placeholder="Escribe tu mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Enviar</button>
      </form>
      {respuesta && <p className="respuesta">{respuesta}</p>}
    </div>
  );
};

export default Contacto;
