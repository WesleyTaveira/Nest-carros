import { Usuario } from "../entity/Usuario";

export interface IUsuarioRepository {
    create(usuario: Usuario): Promise<Usuario>;
    delete(id: number): Promise<void>;
    findMesmoEmail(userEmail: string): Promise<Usuario | null>;
    find(id: number): Promise<Usuario | null>;
    findAll(): Promise<Usuario[]>;
}

