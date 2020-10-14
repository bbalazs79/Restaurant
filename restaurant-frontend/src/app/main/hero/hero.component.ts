import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-hero",
  templateUrl: "./hero.component.html",
  styleUrls: ["./hero.component.scss"]
})
export class HeroComponent implements OnInit {
  heroCarousel;
  heroCarouselScrollTimer;
  heroCarouselCurrentIndex = 0;

  constructor() {}

  ngOnInit(): void {}

  /* onClickRight() {
    clearInterval(heroCarouselScrollTimer);
    scrollCarousel(heroCarousel);
  }

  onClickLeft() {
    clearInterval(heroCarouselScrollTimer);
    scrollCarousel(heroCarousel, -1);
  }

  setLoggedIn(isLoggedIn) {
    updateView({ isLoggedIn });
  }

  scrollCarousel(carouselElement, direction = 1) {
    const itemCount = carouselElement.querySelectorAll('.item').length;
    heroCarouselCurrentIndex += direction;
    if (heroCarouselCurrentIndex >= itemCount) {
        heroCarouselCurrentIndex = 0;
    } else if (heroCarouselCurrentIndex < 0) {
        heroCarouselCurrentIndex = itemCount - 1;
    }
    setCarouselActiveItem(carouselElement, heroCarouselCurrentIndex);
} */
}
