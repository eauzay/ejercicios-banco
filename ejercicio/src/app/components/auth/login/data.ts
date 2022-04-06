import { User } from "src/app/models/user";
import { Role } from '../../../models/role';

export const listUsers: Array<User> = [

    {
        id: 1,
        name: "Evelyn Tatiana Auzay Jurado",
        identification: "1722267067",
        city: "Quito",
        idRole: 1
    },
    {
        id: 2,
        name: "Andres Benavides",
        identification: "1714785145",
        city: "Latacunga",
        idRole: 2
    },
    {
        id: 3,
        name: "Maria Fiallos",
        identification: "1712457896",
        city: "Cuenca",
        idRole: 1
    }
]

export const listRoles: Array<Role> = [

    {
        id: 1,
        name: "Administrativo",
        description: "Rol del personal administrativo"
    },
    {
        id: 2,
        name: "TI",
        description: "Rol del personal de tecnología"
    },
    {
        id: 3,
        name: "Soporte",
        description: "Rol del personal dedicado a soporte"
    }
]