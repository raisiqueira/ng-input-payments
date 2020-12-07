import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentInputsModule } from '@justa/payment-inputs';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ReactiveFormsModule, PaymentInputsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
