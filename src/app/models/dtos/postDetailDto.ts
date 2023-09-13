export interface PostDetailDto{
    postId:number;
    userId:number;
    parentId:number;
    content:string;
    creationDate:Date;
    comment:number;
    fav:number[];
    verify:number[];
    status:boolean;
    roles:string[];
    userName:string;
    profileImage:string;
}