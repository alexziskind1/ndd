import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { PanGestureEventData } from "tns-core-modules/ui/gestures/gestures";
import { SlidesComponent, direction } from "./slides/slides/slides.component";
import { Button } from 'ui/button';
import { AnimationCurve } from "tns-core-modules/ui/enums/enums";
import { Animation } from "tns-core-modules/ui/animation/animation";
import { Label } from "tns-core-modules/ui/label/label";
import * as platform from 'platform';
import * as gestures from 'ui/gestures';
import * as app from 'application';
import { Page } from "tns-core-modules/ui/page";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    private animationDuration = 350;
    private btnMinScale = 0.8;
    private btnMaxScale = 1;

    private previousDelta = -1;
    private startingX = 0;

    @ViewChild(SlidesComponent)
    private slidesComponent: SlidesComponent;

    @ViewChild('btn1') btn1Ref: ElementRef;
    @ViewChild('btn2') btn2Ref: ElementRef;
    @ViewChild('underline') underlineRef: ElementRef;

    private get btn1(): Button {
        return this.btn1Ref.nativeElement;
    }
    private get btn2(): Button {
        return this.btn2Ref.nativeElement;
    }
    private get underline(): Label {
        return this.underlineRef.nativeElement;
    }

    private get pageWidth(): number {
        return platform.screen.mainScreen.widthDIPs;
    }

    constructor(private page: Page) {
        this.page.backgroundSpanUnderStatusBar = true;
        //this.page. backgroundColor=
    }

    public ngOnInit() {
        this.underline.width = this.pageWidth / 2;
    }

    public onChanging(args: PanGestureEventData) {
        if ((args.deltaX < 0 && !this.slidesComponent.hasNext) ||
            (args.deltaX > 0 && !this.slidesComponent.hasPrevious)) {
            return;
        }
        const btnScaleOffset = this.getBtnScale(args.deltaX);


        if (args.state === gestures.GestureStateTypes.began) {
            this.previousDelta = 0;
            this.startingX = this.underline.translateX;

            if (this.slidesComponent.currentSlide.index === 0) {
                this.underline.translateX = 0;
            } else if (this.slidesComponent.currentSlide.index === 1) {
                this.underline.translateX = this.pageWidth / 2;
            }
        } else if (args.state === gestures.GestureStateTypes.ended) {

        } else if (args.state === gestures.GestureStateTypes.changed) {
            if (this.previousDelta !== args.deltaX
                && args.deltaX != null
                && args.deltaX < 0) { //panning to the left
                this.underline.translateX = -1 * args.deltaX / 2;

                this.btn2.scaleX = this.btnMinScale + btnScaleOffset;
                this.btn2.scaleY = this.btnMinScale + btnScaleOffset;
                this.btn1.scaleX = this.btnMaxScale - btnScaleOffset;
                this.btn1.scaleY = this.btnMaxScale - btnScaleOffset;

            } else if (this.previousDelta !== args.deltaX
                && args.deltaX != null
                && args.deltaX > 0) { //panning to the right
                this.underline.translateX = (this.pageWidth / 2 + -1 * args.deltaX / 2);

                this.btn1.scaleX = this.btnMinScale + btnScaleOffset;
                this.btn1.scaleY = this.btnMinScale + btnScaleOffset;
                this.btn2.scaleX = this.btnMaxScale - btnScaleOffset;
                this.btn2.scaleY = this.btnMaxScale - btnScaleOffset;
            }

            if (args.deltaX !== 0) {
                this.previousDelta = args.deltaX;
            }
        }
    }

    private getBtnScale(delta: number): number {
        const btnScaleRatio = Math.abs(delta) / this.pageWidth;
        return (this.btnMaxScale - this.btnMinScale) * btnScaleRatio;
    }

    private underlineSlide1(dur: number) {
        this.underline.animate({
            translate: { x: 0, y: 0 },
            duration: dur,
            curve: AnimationCurve.easeOut
        });
    }

    private underlineSlide2(dur: number) {
        this.underline.animate({
            translate: { x: this.pageWidth / 2, y: 0 },
            duration: dur,
            curve: AnimationCurve.easeOut
        });
    }

    public onShowSlide(args: direction) {

        let transition = [];

        let btnFrom = this.btn1;
        let btnTo = this.btn2;
        if (args === direction.left) {
            btnFrom = this.btn2;
            btnTo = this.btn1;
            this.underlineSlide1(this.animationDuration);
        } else if (args === direction.right) {
            this.underlineSlide2(this.animationDuration);
        } else if (args === direction.none) {
            if (this.slidesComponent.currentSlide.index === 0) {
                btnFrom = this.btn2;
                btnTo = this.btn1;
                this.underlineSlide1(this.animationDuration);
            } else {
                btnFrom = this.btn1;
                btnTo = this.btn2;
                this.underlineSlide2(this.animationDuration);
            }
        }

        transition.push({
            target: btnTo,
            scale: { x: this.btnMaxScale, y: this.btnMaxScale },
            duration: this.animationDuration,
            curve: AnimationCurve.easeOut
        });
        transition.push({
            target: btnFrom,
            scale: { x: this.btnMinScale, y: this.btnMinScale },
            duration: this.animationDuration,
            curve: AnimationCurve.easeOut
        });
        let animationSet = new Animation(transition, false);
        return animationSet.play().then(() => {
            btnTo.className = 'btn-active';
            btnFrom.className = 'btn-inactive';
        });
    }

    public gotoSlide0(args) {
        this.slidesComponent.GoToSlide(0, 50, this.animationDuration);
    }

    public gotoSlide1(args) {
        this.slidesComponent.GoToSlide(1, 50, this.animationDuration);
    }
}
