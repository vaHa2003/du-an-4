// models/Route.ts
export class Route {
    route_id: string;
    name_route: string;
    img_route: string;
    discription_route: string; // Sửa lại tên thuộc tính
    status: 'default' | 'customize';
    del_flag: boolean;
    created_at: Date;
    updated_at: Date;

    constructor(
        route_id: string,
        name_route: string,
        img_route: string,
        discription_route: string,
        del_flag: boolean,
        created_at: Date,
        updated_at: Date,
        status: 'default' | 'customize' = 'default',
    ) {
        this.route_id = route_id;
        this.name_route = name_route;
        this.img_route = img_route;
        this.discription_route = discription_route;
        this.del_flag = del_flag;
        this.created_at = new Date(created_at);
        this.updated_at = new Date(updated_at);
        this.status = status;
    }

    displayInfo() {
        return `${this.name_route} - Mô tả: ${this.discription_route} - Trạng thái: ${this.status}`;
    }
}
