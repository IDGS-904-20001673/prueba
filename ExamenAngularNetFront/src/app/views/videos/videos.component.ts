import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavUserComponent } from '../../components/nav-user/nav-user.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

interface YoutubeSearchResponse {
  items: {
    snippet: {
      title: string;
    }
  }[];
}

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent {
    frmYoutube: FormGroup;
    title = 'youtube-search-angular17';
    videos: any[] = [];
    apiKey = 'AIzaSyC0vbAUlEGqN8KdlaYpb5K41jExfA5DcQ4';
    baseUrl = 'https://www.googleapis.com/youtube/v3';
  
    constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
      this.frmYoutube = new FormGroup({
        seach: new FormControl('', [Validators.required]),
      })

    }

    paramToSearch(){
      this.search(this.frmYoutube.value.seach);
    }

   async search(query: string) {
     const url = `${this.baseUrl}/search?part=snippet&maxResults=5&q=${query}&type=video&key=${this.apiKey}`;
     await this.http.get(url).subscribe(
        (response: YoutubeSearchResponse) => {
          this.videos = response.items;
        },
        error => {
          console.error('Error al buscar videos:', error);
        }
      );
    }
  
    getVideoUrl(videoId: string) {
      const url = `https://www.youtube.com/embed/${videoId}?autoplay=0`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

