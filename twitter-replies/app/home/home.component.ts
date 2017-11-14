import { Component, ViewChild, ElementRef } from '@angular/core';
import { SlideInDirective } from '../slide-in.directive';
import { GridLayout } from 'ui/layouts/grid-layout';
import { Page } from 'ui/page';
import { SlideOutDirective } from "../slide-out.directive";

@Component({
    selector: 'home',
    moduleId: module.id,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    @ViewChild(SlideOutDirective) private slideOut: SlideOutDirective;
    @ViewChild(SlideInDirective) private slideIn: SlideInDirective;

    constructor(private page: Page) {
        page.actionBarHidden = true;
    }

    private onShowTapped(args): void {
        this.slideOut.show();
        this.slideIn.show();
    }

    private onHideTapped(args): void {
        this.slideOut.dismiss();
        this.slideIn.dismiss();
    }
}