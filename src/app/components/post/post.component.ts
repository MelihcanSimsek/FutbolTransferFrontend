import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/auth/userModel';
import { Club } from 'src/app/models/entities/club';
import { Player } from 'src/app/models/entities/player';
import { Post } from 'src/app/models/entities/post';
import { Transfer } from 'src/app/models/entities/transfer';
import { AuthService } from 'src/app/services/auth.service';
import { ClubService } from 'src/app/services/club.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PlayerService } from 'src/app/services/player.service';
import { PostService } from 'src/app/services/post.service';
import { RoleService } from 'src/app/services/role.service';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  imageUrL = 'https://localhost:7144/Uploads/images/';
  selectPlayer: string = 'Oyuncu Seçiniz';
  selectClub: string = 'Kulüp Seçiniz';
  postType: number;
  postForm: FormGroup;
  players: Player[] = [];
  clubs: Club[] = [];
  playerFilterText: string = '';
  clubFilterText: string = '';
  selectedPlayer: Player;
  selectedClub: Club;
  alphabet: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  constructor(
    private toastService: ToastrService,
    private authService: AuthService,
    private postService: PostService,
    private router: Router,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private playerService: PlayerService,
    private clubService: ClubService,
    private transferService: TransferService
  ) {}

  ngOnInit(): void {
    this.postType = 1;
    this.createPostForm();
  }

  getPlayers(letter: string) {
    this.playerService.getPlayers(letter).subscribe(
      (response) => {
        this.players = response.data;
      },
      (responseError) => {
        console.log(responseError);
      }
    );
  }

  getClubs(letter: string) {
    this.clubService.getClubs(letter).subscribe(
      (response) => {
        this.clubs = response.data;
      },
      (responseError) => {
        console.log(responseError);
      }
    );
  }

  post() {
    if (this.postForm.valid) {
      let userInfo: UserModel = this.authService.getUserInfo();
      
      if (this.postType == 1) {
        let postItem: Post = Object.assign({
          id: 0,
          userId: userInfo.id,
          comment: 0,
          content:this.postForm.value.postContent,
          parentId: 0,
          status: false,
          creationDate: new Date()
        });
        this.postService.post(postItem).subscribe((response) => {
          this.toastService.success('Paylaşım Gönderildi', 'Başarılı');
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
      } else {
        let postItem: Post = Object.assign({
          userId: userInfo.id,
          comment: 0,
          content:this.postForm.value.postContent,
          parentId: 0,
          status: true,
          creationDate: new Date()
        });
        if (this.selectedPlayer == null || this.selectedClub == null) {
          this.toastService.info(
            'Lütfen eksik bilgileri tamamlayınız',
            'Hata'
          );
        } else {
          this.postService.post(postItem).subscribe((oldResponse) => {
            let transfer:Transfer = Object.assign({
              id:0,
              playerId:this.selectedPlayer.id,
              teamId:this.selectedClub.id,
              postId:oldResponse.data.id
            });
            this.transferService.add(transfer).subscribe(response=>{
              this.toastService.success("Transfer Haberi Gönderildi","Başarılı");
              setTimeout(() => {
                location.reload();
              }, 500);
            });
          });
        }
      }
    } else {
      this.toastService.info('Bir şeyler söyleyin', 'İçerik Boş');
    }
  }

  createPostForm() {
    this.postForm = this.formBuilder.group({
      postContent: ['', Validators.required],
    });
  }

  checkUserRoles() {
    if (this.authService.getUserInfo().roles != undefined) {
      return this.roleService.checkRolesForJournalist(
        this.authService.getUserInfo().roles
      );
    }
    return false;
  }

  onPlayerLetterClicked(letter: string) {
    this.playerFilterText = '';
    this.getPlayers(letter);
  }

  onClubLetterClicked(letter: string) {
    this.clubFilterText = '';
    this.getClubs(letter);
  }

  onPlayerClicked(playerModel: Player) {
    this.selectedPlayer = playerModel;
    this.selectPlayer = playerModel.name;
  }
  onClubClicked(clubModel: Club) {
    this.selectedClub = clubModel;
    this.selectClub = clubModel.team;
  }

  getPlayerImage(profileImage: string): string {
    if (profileImage.includes('localhost:7103')) {
      return this.imageUrL + 'DefaultPlayerImage.jpg';
    }
    return profileImage;
  }

  getClubImage(image: string): string {
    if (image.includes('localhost:7103')) {
      return this.imageUrL + 'DefaultClubImage.jpg';
    }
    return image;
  }

  getPostcontentPlaceholder() {
    if (this.postType == 1) {
      return 'Fikrini paylaş';
    } else {
      return 'Transfer Haberi Paylaş';
    }
  }
}
