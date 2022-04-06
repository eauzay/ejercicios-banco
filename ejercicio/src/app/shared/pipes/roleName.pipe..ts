import { Pipe, PipeTransform } from "@angular/core";
import { Role } from "src/app/models/role";

@Pipe({
    name: 'roleName'
})
export class RoleNamePipe implements PipeTransform {
    listRoles!: Array<Role>;

    transform(value: any): string {
        let roles = sessionStorage.getItem('roles');
        this.listRoles = (roles !== null) ? JSON.parse(roles) : null;
        return this.listRoles.filter(x => x.id === Number(value))[0].name;
    }
}