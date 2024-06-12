import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { exhaustMap, take } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { User } from 'src/app/shared/Models/user';
import { UserService } from 'src/app/shared/services/userService/user.service';

@Component({
  selector: 'app-create-testmony',
  templateUrl: './create-testmony.component.html',
  styleUrls: ['./create-testmony.component.css']
})
export class CreateTestmonyComponent {
  public user: User = new User();
  headers!: any;
  selectedFile!: File;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthenticationService) {
    this.route.params.subscribe((params) => {
      if(params['id']){
        this.user.id = params['id'];
      }
    });
  }

  /**
   * Function is used to create Testmony.
   */
  CreateUpdateTestmony() {
    const user: any = localStorage.getItem('user');
    const userLocal = JSON.parse(user)
    const formData = new FormData();
    const age = parseInt(this.user.age)
    const newPayload = {
      name: this.user.name,
      description: this.user.description,
      age: age
    }
    formData.append('user', JSON.stringify(newPayload));
    formData.append('image', this.selectedFile)
    if (!this.user.id) {
      return this.userService.createUserTestmony(formData, userLocal.token).subscribe(() => {
        console.log('user')
      })
    } else {
      return this.userService.updateUserTestMony(formData, this.user.id, userLocal.token).subscribe(() => {
        console.log('user')
      })
    }
  }

  /**
   * Function is used to image upload.
   */
  imageUpload(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
