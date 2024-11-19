import { Cita, Dentista, Paciente } from '../types';
import React, { useEffect, useState } from 'react';

export interface CitaFormProps {
    onSubmit: (cita: Omit<Cita, 'id'>) => void;
    onCancel?: () => void;
    initialData?: Cita;
    dentistas: Dentista[];
    pacientes: Paciente[];
}

export const CitaForm: React.FC<CitaFormProps> = ({
    onSubmit,
    onCancel,
    initialData,
    dentistas,
    pacientes
}) => {
    const [formData, setFormData] = useState({
        dentistaId: '',
        pacienteId: '',
        fechaHora: '',
        motivo: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                dentistaId: initialData.dentista.id.toString(),
                pacienteId: initialData.paciente.id.toString(),
                fechaHora: initialData.fechaHora,
                motivo: initialData.motivo
            });
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const selectedDentista = dentistas.find(d => d.id === parseInt(formData.dentistaId));
        const selectedPaciente = pacientes.find(p => p.id === parseInt(formData.pacienteId));

        if (selectedDentista && selectedPaciente) {
            onSubmit({
                dentista: selectedDentista,
                paciente: selectedPaciente,
                fechaHora: formData.fechaHora,
                motivo: formData.motivo
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Dentista:
                    <select
                        name="dentistaId"
                        value={formData.dentistaId}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    >
                        <option value="">Seleccione un dentista</option>
                        {dentistas.map(dentista => (
                            <option key={dentista.id} value={dentista.id}>
                                {`${dentista.nombre} ${dentista.apellido} - ${dentista.especialidad}`}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Paciente:
                    <select
                        name="pacienteId"
                        value={formData.pacienteId}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    >
                        <option value="">Seleccione un paciente</option>
                        {pacientes.map(paciente => (
                            <option key={paciente.id} value={paciente.id}>
                                {`${paciente.nombre} ${paciente.apellido}`}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Fecha y Hora:
                    <input
                        type="datetime-local"
                        name="fechaHora"
                        value={formData.fechaHora}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </label>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Motivo:
                    <textarea
                        name="motivo"
                        value={formData.motivo}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        rows={3}
                        required
                    />
                </label>
            </div>

            <div className="flex justify-end space-x-2">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Guardar
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-200 px-4 py-2 rounded-md"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default CitaForm;