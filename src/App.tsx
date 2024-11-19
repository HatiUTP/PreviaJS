import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dentista, Paciente, Cita, CitaDTO } from './types';
import { DentistaForm } from './components/DentistaForm';
import { DentistaTable } from './components/DentistaTable';
import { PacienteForm } from './components/PacienteForm';
import { PacienteTable } from './components/PacienteTable';
import { CitaForm } from './components/CitaForm';
import { CitaTable } from './components/CitaTable';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'dentistas' | 'pacientes' | 'citas'>('dentistas');
  const [dentistas, setDentistas] = useState<Dentista[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [selectedDentista, setSelectedDentista] = useState<Dentista | undefined>();
  const [selectedPaciente, setPacienteDentista] = useState<Paciente | undefined>();
  const [selectedCita, setSelectedCita] = useState<Cita | undefined>();
  const [showDentistaForm, setShowDentistaForm] = useState(false);
  const [showPacienteForm, setShowPacienteForm] = useState(false);
  const [showCitaForm, setShowCitaForm] = useState(false);

  const fetchDentistas = async () => {
    const response = await axios.get('http://localhost:8009/clinicadental/dentistas');
    setDentistas(response.data);
  };

  const fetchPacientes = async () => {
    const response = await axios.get('http://localhost:8009/clinicadental/pacientes');
    setPacientes(response.data);
  };

  const fetchCitas = async () => {
    const response = await axios.get('http://localhost:8009/clinicadental/citas');
    setCitas(response.data);
  };

  useEffect(() => {
    fetchDentistas();
    fetchPacientes();
    fetchCitas();
  }, []);

  // Funciones CRUD para Dentistas
  const handleCreateDentista = async (dentista: Omit<Dentista, 'id'>) => {
    await axios.post('http://localhost:8009/clinicadental/dentistas', dentista);
    fetchDentistas();
    setShowDentistaForm(false);
  };

  const handleUpdateDentista = async (dentista: Omit<Dentista, 'id'>) => {
    if (selectedDentista) {
      await axios.put(`http://localhost:8009/clinicadental/dentistas/${selectedDentista.id}`, dentista);
      fetchDentistas();
      setSelectedDentista(undefined);
      setShowDentistaForm(false);
    }
  };

  const handleDeleteDentista = async (id: number) => {
    await axios.delete(`http://localhost:8009/clinicadental/dentistas/${id}`);
    fetchDentistas();
  };

  // Funciones CRUD para Pacientes
  const handleCreatePaciente = async (paciente: Omit<Paciente, 'id'>) => {
    await axios.post('http://localhost:8009/clinicadental/pacientes', paciente);
    fetchPacientes();
    setShowPacienteForm(false);
  };

  const handleUpdatePaciente = async (paciente: Omit<Paciente, 'id'>) => {
    if (selectedPaciente) {
      await axios.put(`http://localhost:8009/clinicadental/pacientes/${selectedPaciente.id}`, paciente);
      fetchPacientes();
      setPacienteDentista(undefined);
      setShowPacienteForm(false);
    }
  };


  const handleDeletePaciente = async (id: number) => {
    await axios.delete(`http://localhost:8009/clinicadental/pacientes/${id}`);
    fetchPacientes();
  };

  // Funciones CRUD para Citas
  const handleCreateCita = async (cita: Omit<Cita, 'id'>) => {
    const citaDTO: CitaDTO = {
        dentistaId: cita.dentista.id,
        pacienteId: cita.paciente.id,
        fechaHora: cita.fechaHora,
        motivo: cita.motivo
    };
    
    await axios.post('http://localhost:8009/clinicadental/citas', citaDTO);
    fetchCitas();
    setShowCitaForm(false);
};

const handleUpdateCita = async (cita: Omit<Cita, 'id'>) => {
  if (selectedCita) {
      const citaDTO: CitaDTO = {
          dentistaId: cita.dentista.id,
          pacienteId: cita.paciente.id,
          fechaHora: cita.fechaHora,
          motivo: cita.motivo
      };

      await axios.put(`http://localhost:8009/clinicadental/citas/${selectedCita.id}`, citaDTO);
      fetchCitas();
      setSelectedCita(undefined);
      setShowCitaForm(false);
  }
};
  const handleDeleteCita = async (id: number) => {
    await axios.delete(`http://localhost:8009/clinicadental/citas/${id}`);
    fetchCitas();
  };


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setCurrentPage('dentistas')}
          className={`px-6 py-2 rounded-lg ${currentPage === 'dentistas'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700'
            }`}
        >
          Dentistas
        </button>
        <button
          onClick={() => setCurrentPage('pacientes')}
          className={`px-6 py-2 rounded-lg ${currentPage === 'pacientes'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700'
            }`}
        >
          Pacientes
        </button>
        <button
          onClick={() => setCurrentPage('citas')}
          className={`px-6 py-2 rounded-lg ${currentPage === 'citas'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700'
            }`}
        >
          Citas
        </button>
      </div>

      {currentPage === 'dentistas' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Gestión de Dentistas</h2>
            <button
              onClick={() => setShowDentistaForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Nuevo Dentista
            </button>
          </div>

          {showDentistaForm && (
            <DentistaForm
              onSubmit={selectedDentista
                ? (data: Omit<Dentista, 'id'>) => handleUpdateDentista(data)
                : handleCreateDentista
              }
              onCancel={() => {
                setShowDentistaForm(false);
                setSelectedDentista(undefined);
              }}
              initialData={selectedDentista}
            />
          )}

          <DentistaTable
            dentistas={dentistas}
            onEdit={(dentista) => {
              setSelectedDentista(dentista);
              setShowDentistaForm(true);
            }}
            onDelete={handleDeleteDentista}
          />
        </div>
      )}

      {currentPage === 'pacientes' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Gestión de Pacientes</h2>
            <button
              onClick={() => setShowPacienteForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Nuevo Paciente
            </button>
          </div>

          {showPacienteForm && (
            <PacienteForm
              onSubmit={selectedPaciente
                ? (data: Omit<Paciente, 'id'>) => handleUpdatePaciente(data)
                : handleCreatePaciente
              }
              onCancel={() => {
                setShowPacienteForm(false);
                setPacienteDentista(undefined);
              }}
              initialData={selectedPaciente}
            />
          )}

          <PacienteTable
            pacientes={pacientes}
            onEdit={(paciente) => {
              setPacienteDentista(paciente);
              setShowPacienteForm(true);
            }}
            onDelete={handleDeletePaciente}
          />
        </div>
      )}

      {currentPage === 'citas' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Gestión de Citas</h2>
            <button
              onClick={() => setShowCitaForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Nueva Cita
            </button>
          </div>

          {showCitaForm && (
            <CitaForm
              onSubmit={selectedCita ? handleUpdateCita : handleCreateCita}
              onCancel={() => {
                setShowCitaForm(false);
                setSelectedCita(undefined);
              }}
              initialData={selectedCita}
              dentistas={dentistas}
              pacientes={pacientes}
            />
          )}

          <CitaTable
            citas={citas}
            onEdit={(cita) => {
              setSelectedCita(cita);
              setShowCitaForm(true);
            }}
            onDelete={handleDeleteCita}
          />
        </div>
      )}

    </div>
  );
};

export default App;