export interface Post{
    id:number;
    userId:number;
    parentId:number;
    content:string;
    creationDate:Date;
    comment:number;
    status:boolean;
}