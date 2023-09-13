export interface TransferPostDto{
    postId:number;
    userId:number;
    teamId:number;
    transferId:number;
    playerId:number;
    content:string;
    creationDate:Date;
    comment:number;
    fav:number[];
    verify:number[];
    status:boolean;
    playerName:string;
    playerPosition:string;
    playerAge:number;
    playerNationality:string;
    playerImage:string;
    playerClub:string;
    clubName:string;
    clubImage:string;
    userProfileImage:string;
    userName:string;
    roles:string[];
    playerClubImage:string;
    transferRate:number;
}


