import { Paciente } from '../types';
import React from 'react';

export interface PacienteTableProps {
    pacientes: Paciente[];
    onEdit: (paciente: Paciente) => void;
    onDelete: (id: number) => void;
}

export const PacienteTable: React.FC<PacienteTableProps> = ({ pacientes, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Nacimiento</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {pacientes.map((paciente) => (
                        <tr key={paciente.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{paciente.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{paciente.nombre}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{paciente.apellido}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{(paciente.fechaNacimiento)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{paciente.telefono}</td>
                            <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                <button
                                    onClick={() => onEdit(paciente)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => onDelete(paciente.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};