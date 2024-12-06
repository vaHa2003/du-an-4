// models/Course.tsx
export class Course {
    id: string;
    name_course: string;
    img_course: string;
    price_course: number;
    discount_price_course?: number;
    views_course: number;
    rating_course: number; // Chuyển đổi thành kiểu number
    del_flag: boolean;
    created_at: Date;
    updated_at?: Date;
    num_chapter: number; // Thêm thuộc tính chapters_count
    num_document: number;
    instructor_avatar: string; // Thêm thuộc tính documents_count
    instructor_id: string;

    constructor(
        id: string,
        name_course: string,
        img_course: string,
        price_course: number,
        instructor_id: string,
        instructor_avatar: string,
        discount_price_course?: number,
        views_course: number = 0,
        rating_course: number = 0,
        del_flag: boolean = false,
        created_at: Date = new Date(),
        updated_at?: Date,
        num_chapter: number = 0,
        num_document: number = 0
    ) {
        this.id = id;
        this.name_course = name_course;
        this.img_course = img_course;
        this.price_course = price_course;
        this.discount_price_course = discount_price_course;
        this.views_course = views_course;
        this.rating_course = rating_course;
        this.del_flag = del_flag;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.instructor_id = instructor_id;
        this.instructor_avatar = instructor_avatar;
        this.num_chapter = num_chapter;
        this.num_document = num_document;
    }

    displayInfo() {
        return `${this.name_course} - Giá: ${this.price_course}$ `;
    }
}
