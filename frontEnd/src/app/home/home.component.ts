import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/authentication/auth.service';
import { OrderGuard } from '../core/guards/order-guard';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public authService: AuthService, public orderGuard: OrderGuard) {}

  ngOnInit(): void {
    console.log('window', window);

    this.changeSlides();
  }

  changeSlides() {
    const slider = document.querySelector('.slider');
    const slides = slider?.querySelectorAll('.slides img');
    const dots = slider?.querySelectorAll('.dot');

    let currentIndex = 0;

    // show first image and dot
    this.changeSlide(slides, dots, currentIndex);

    // add click event listener to dots
    dots?.forEach((dot) =>
      dot.addEventListener('click', (e: any) => {
        // get index of clicked dot
        const index = e.target.getAttribute('data-index');

        // update current index
        currentIndex = index;

        // change slide
        this.changeSlide(slides, dots, currentIndex);
      })
    );
  }

  changeSlide(slides?: any, dots?: any, currentIndex?: any) {
    // hide all images
    slides?.forEach((slide: any) => (slide.style.display = 'none'));

    // remove active class from all dots
    dots?.forEach((dot: any) => dot.classList.remove('active'));

    // remove active class from all images
    slides?.forEach((slide: any) => slide.classList.remove('active'));

    if(slides) {
      // show current image
      slides[currentIndex].style.display = 'block';
      // add active class to current image
      slides[currentIndex].classList.add('active');
    }

    if(dots) {
      // add active class to current dot
      dots[currentIndex].classList.add('active');

    }

    
    
  }
}
