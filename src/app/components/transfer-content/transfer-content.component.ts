import { Component, OnInit } from '@angular/core';
import { faArrowRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { TransferPostDto } from 'src/app/models/dtos/transferPostDto';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-transfer-content',
  templateUrl: './transfer-content.component.html',
  styleUrls: ['./transfer-content.component.css']
})
export class TransferContentComponent implements OnInit {
  imageUrL = "https://localhost:7144/Uploads/images/";
  dailyTransferPost:TransferPostDto[]=[];
  rightArrow = faArrowRight;
  constructor(private postService:PostService) {
    
  }

  ngOnInit(): void {
    this.getDailyPost();
  }

  getDailyPost()
  {
    this.postService.getDailyTransferPost().subscribe(response=>{
      if(response.data.length < 5 )
      {
        this.dailyTransferPost = response.data;
      }
      else{
        for (let i = 0; i < 5; i++) {
          this.dailyTransferPost.push(response.data[i]);
        }
      }
    })
  }

  getPlayerImage(playerImage:string)
  {
    if (playerImage.includes('localhost:7103')) {
      return this.imageUrL + 'DefaultPlayerImage.jpg';
    }
    return playerImage;
  }

}
