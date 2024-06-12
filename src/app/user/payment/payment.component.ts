import { Component } from '@angular/core';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  amountInPaise: any = 1;
  options: any = {}
  constructor(private windowRefService: WindowRefService) {

  }

  ngOnInit() {
    const amount = 8000
    this.amountInPaise = this.convertRupeeToPaisa(amount)
    this.updateOptons()
  }

  convertRupeeToPaisa(rupee: any) {
    return rupee * 100;
  }

  // Getter method to compute the amount dynamically
  get amount(): number {
    return 14 * 100;
  }

  updateOptons() {
    this.options = {
      "key": "rzp_test_hLZimLoE2k1Url", // Enter the Key ID generated from the Dashboard
      "amount": this.amountInPaise, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Web Solutions", //your business name
      "description": "Test Transaction",
      "image": "https://picsum.photos/200/300",
      "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response: any) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
      },
      //"callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "8544941820"  //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#FF0000"
      },
      "model": {
        onDismiss: () => {
          console.log('dismissed')
        }
      }
    };
  }



  payment() {
    this.options.amount = 9000
    let rzp1 = new this.windowRefService.nativeWindow.Razorpay(this.options);
    console.log(rzp1)
    rzp1.open();
    //   rzp1.on('payment.failed', function (response){
    //     alert(response.error.code);
    //     alert(response.error.description);
    //     alert(response.error.source);
    //     alert(response.error.step);
    //     alert(response.error.reason);
    //     alert(response.error.metadata.order_id);
    //     alert(response.error.metadata.payment_id);
    // }
  }

}
