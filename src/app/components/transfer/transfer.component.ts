import { Component, OnInit } from '@angular/core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { TransferPostDto } from 'src/app/models/dtos/transferPostDto';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit{
  checkIcon = faCheckCircle;
  imageUrL = "https://localhost:7144/Uploads/images/";
  dailyTransferPost:TransferPostDto[]=[];
  weeklyTransferPost:TransferPostDto[]=[];
  monthlyTransferPost:TransferPostDto[]=[];
  constructor(private postService:PostService) {
    
  }

  ngOnInit(): void {
    this.getDailyTransferPost();
    this.getMonthlyTransferPost();
    this.getWeeklyTransferPost();
  }

  getDailyTransferPost()
  {
    this.postService.getDailyTransferPost().subscribe(response=>{
      this.dailyTransferPost = response.data;
    })
  }

  getWeeklyTransferPost()
  {
    this.postService.getWeeklyTransferPost().subscribe(response=>{
      this.weeklyTransferPost = response.data;
    })
  }

  getMonthlyTransferPost()
  {
    this.postService.getMonthlyTransferPost().subscribe(response=>{
      this.monthlyTransferPost = response.data;
    })
  }

  getPlayerImage(playerImage:string)
  {
    if (playerImage.includes('localhost:7103')) {
      return this.imageUrL + 'DefaultPlayerImage.jpg';
    }
    return playerImage;
  }

  getTransferRate(transferRate:number)
  {
    return 'width:'+transferRate+'%';
  }

  getUserImage(image:string)
  {
    let newUrl;
    if(image == null)
    {
      newUrl = this.imageUrL + 'DefaultProfileImage.jpg';
    }
    else
    {
      newUrl = this.imageUrL + image;
    }
    
    return newUrl;
  }

}

