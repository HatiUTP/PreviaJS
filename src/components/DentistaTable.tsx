import { Dentista } from '../types';

export interface DentistaTableProps {
    dentistas: Dentista[];
    onEdit: (dentista: Dentista) => void;
    onDelete: (id: number) => void;
}

export const DentistaTable: React.FC<DentistaTableProps> = ({ dentistas, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especialidad</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {dentistas.map((dentista) => (
                        <tr key={dentista.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{dentista.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{dentista.nombre}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{dentista.apellido}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{dentista.especialidad}</td>
                            <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                <button
                                    onClick={() => onEdit(dentista)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => onDelete(dentista.id)}
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

export default DentistaTable;