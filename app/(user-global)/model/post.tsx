
export class Post {
    id: string;
    title_post: string;
    content_post: string;
    img_post: string;
    views_post: number;
    user_id: number;
    category_id: number;
    created_at: Date;
    updated_at: Date;

    constructor(
        id: string,
        title_post: string,
        content_post: string,
        img_post: string,
        views_post: number,
        user_id: number,
        category_id: number,
        created_at: Date,
        updated_at: Date
    ) {
        this.id = id;
        this.title_post = title_post;
        this.content_post = content_post;
        this.img_post = img_post;
        this.views_post = views_post;
        this.user_id = user_id;
        this.category_id = category_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    // Phương thức để hiển thị thông tin bài viết
    displayInfo() {
        return `${this.title_post} - Views: ${this.views_post}`;
    }
}
