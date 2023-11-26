export interface Locais {
    id?: number;
    name: string;
    description: string;
}

export interface Pontos_Interesse {
    id_ponto?: number;
    name: string;
    description: string;
    locais: number[];
}

export interface Viagem {
    id?: number;
    name: string;
    start_date: Date;
    end_date: Date;
    notes: string;
    locais: number[];
    pontos_interesse: number[];
}
  