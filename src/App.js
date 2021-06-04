import React, { Fragment, useState , useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {
  //citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  //Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);
  
  useEffect ( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas))
    }else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas] );

  //funcion que tome las actuales y agregue nuevas
  const crearCita = cita => {
    guardarCitas([
      ...citas, cita]);
  }

  //Funcioin que elimina una cita por su ID
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    guardarCitas(nuevasCitas);
  }

  //Mensaje condicioonal
  const titulo = citas.length ===0 ? 'Sin citas previas' : 'Administra tus citas';

  return (
    <fragment>
      <h1>Administrador de pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
            crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </fragment>
  );
}

export default App;
