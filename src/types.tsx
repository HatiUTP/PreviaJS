export interface Dentista {
    id: number;
    nombre: string;
    apellido: string;
    especialidad: string;
}

export interface Paciente {
    id: number;
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
    telefono: string;
}

export interface Cita {
    id: number;
    dentista: Dentista;
    paciente: Paciente;
    fechaHora: string;
    motivo: string;
}

export interface CitaDTO {
    dentistaId: number;
    pacienteId: number;
    fechaHora: string;
    motivo: string;
}