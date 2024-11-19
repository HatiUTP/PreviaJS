import { Paciente } from '../types';
import React, { useEffect, useState } from 'react';

export interface PacienteFormProps {
    onSubmit: (paciente: Omit<Paciente, 'id'>) => void;
    onCancel?: () => void;
    initialData?: Paciente;
}

export const PacienteForm: React.FC<PacienteFormProps> = ({ onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        telefono: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                nombre: initialData.nombre,
                apellido: initialData.apellido,
                fechaNacimiento: initialData.fechaNacimiento,
                telefono: initialData.telefono
            });
        } else {
            setFormData({
                nombre: '',
                apellido: '',
                fechaNacimiento: '',
                telefono: ''
            });
        }

        return () => {
            setFormData({
                nombre: '',
                apellido: '',
                fechaNacimiento: '',
                telefono: ''
            });
        };
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                    Nombre:
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </label>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Apellido:
                    <input
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </label>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Fecha de Nacimiento:
                    <input
                        type="date"
                        name="fechaNacimiento"
                        value={formData.fechaNacimiento}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </label>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Teléfono:
                    <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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