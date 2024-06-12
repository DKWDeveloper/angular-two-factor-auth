import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/services/userService/user.service';

@Component({
  selector: 'app-list-testmony',
  templateUrl: './list-testmony.component.html',
  styleUrls: ['./list-testmony.component.css']
})
export class ListTestmonyComponent {
  testMonyList: any = [];
  constructor(private userService: UserService) { }
  ngOnInit() {
    this.getAllUserTestmony()
  }

  /**
   * Function is used to get all Data. 
   */
  getAllUserTestmony() {
    this.userService.getAllUserTestmony().subscribe((res: any) => {
      if (res.success) {
        this.testMonyList = res.personList;
      }
    })
  }

  /**
   * Function is used to show server image.
   * @param imagePath 
   * @returns 
   */
  getImageUrl(imagePath: string): string {
    return `http://localhost:3000/${imagePath}`
  }


  deleteTestmony(id: string) {
    const userId = { id: id }
    this.userService.deleteUserTestmony(userId).subscribe((_) => {
      this.getAllUserTestmony();
    })
  }

}
