import { Cita } from '../types';
import React from 'react';

export interface CitaTableProps {
    citas: Cita[];
    onEdit: (cita: Cita) => void;
    onDelete: (id: number) => void;
}

export const CitaTable: React.FC<CitaTableProps> = ({ citas, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dentista</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha y Hora</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motivo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {citas.map((cita) => (
                        <tr key={cita.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{cita.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {`${cita.dentista.nombre} ${cita.dentista.apellido}`}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {`${cita.paciente.nombre} ${cita.paciente.apellido}`}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {new Date(cita.fechaHora).toLocaleString()}
                            </td>
                            <td className="px-6 py-4">{cita.motivo}</td>
                            <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                <button
                                    onClick={() => onEdit(cita)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => onDelete(cita.id)}
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