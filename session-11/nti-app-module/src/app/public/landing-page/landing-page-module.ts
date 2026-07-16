import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeroComponent } from './hero/hero.component';
import { FeaturesComponent } from './features/features.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [FooterComponent, HeroComponent, FeaturesComponent, NavbarComponent],
  imports: [CommonModule],
  exports: [FeaturesComponent, HeroComponent, FooterComponent, NavbarComponent],
})
export class LandingPageModule {}
