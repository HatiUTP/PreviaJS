import { Dentista } from '../types';
import React, { useEffect, useState } from 'react';

export interface DentistaFormProps {
    onSubmit: (dentista: Omit<Dentista, 'id'>) => void;
    onCancel?: () => void;
    initialData?: Dentista;
}

export const DentistaForm: React.FC<DentistaFormProps> = ({ onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        especialidad: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                nombre: initialData.nombre,
                apellido: initialData.apellido,
                especialidad: initialData.especialidad
            });
        } else {
            setFormData({
                nombre: '',
                apellido: '',
                especialidad: ''
            });
        }
    
        return () => {
            setFormData({
                nombre: '',
                apellido: '',
                especialidad: ''
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
                    Especialidad:
                    <input
                        type="text"
                        name="especialidad"
                        value={formData.especialidad}
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

export default DentistaForm;