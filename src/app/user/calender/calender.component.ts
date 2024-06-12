import { Component } from '@angular/core';
import { EventSettingsModel, View } from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data'

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent {


  private schedule: any = [
    // {
    //   Subject: "Deepak",
    //   StartTime: new Date(new Date(1707573806351).getFullYear(), new Date(1707573806351).getMonth(), new Date(1707573806351).getDate(), new Date(1707573806351).getHours(), 30),
    //   EndTime: new Date(2024, 1, 10, 1, 30),
    // },

    {
      Id: 1,
      Subject: 'Story Time for Kids',
      StartTime: new Date(2024, 1, 14, 10, 0),
      EndTime: new Date(2024, 1, 14, 11, 30),
      CategoryColor: '#1aaa55'
    }, {
      Id: 2,
      Subject: 'Camping with Turtles',
      StartTime: new Date(2024, 1, 15, 12, 0),
      EndTime: new Date(2024, 1, 15, 14, 0),
      CategoryColor: '#357cd2',
      IsAllDay: true
    },
    // {
    //   Subject: "Deepak Kumar",
    //   StartTime: new Date(),
    //   EndTime: new Date(2024, 1, 7, 6, 0),
    // }
  ];

  private eventData: DataManager = new DataManager({
    url: 'https://js.syncfusion.com/demos/ejservcies/api/schedule/LoadData',
    adaptor: new WebApiAdaptor,
    crossDomain: true
  })

  public setView: View = 'WorkWeek';
  public setDate: Date = new Date();
  public eventObject: EventSettingsModel = {
    dataSource: []
  }


  ngOnInit() {
    this.getSchduleSlotList();
  }

  getSchduleSlotList() {
    this.eventObject.dataSource = this.schedule;
    // this.eventObject.dataSource = this.eventData;
  }
}
