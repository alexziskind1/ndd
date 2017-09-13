import { Component, ViewChild, ElementRef } from "@angular/core";
import { Label } from 'ui/label';
import { Page } from 'ui/page';
import * as enums from 'ui/enums';
import { Animation } from "tns-core-modules/ui/animation";

//var CGRect, CGRectMake, CGAffineTransformMakeScale, UIView, UIViewAnimationOptionCurveEaseOut;

@Component({
    selector: "ns-app",
    template: `
        <Label #thelbl class="mylbl"></Label>
    `,
    styles: [`
        .mylbl {
            width: 100;
            height: 100;
            transform: translate(-280, 0);
            background-color: #1e1e1e;
        }
    `]
})
export class AppComponent {

    @ViewChild('thelbl') mylblRef: ElementRef;
    private get lbl(): Label {
        return this.mylblRef.nativeElement;
    }

    constructor(private page: Page) { }

    public ngOnInit() {
        UIView.animateWithDurationDelayOptionsAnimationsCompletion(1, 0,
            UIViewAnimationOptions.CurveEaseInOut,
            () => this.lbl.translateX = 0,
            () => {
                UIView.animateWithDurationDelayOptionsAnimationsCompletion(1, 0.4,
                    UIViewAnimationOptions.CurveEaseInOut,
                    () => this.lbl.translateX = 800,
                    () => console.log('done')
                )
            }
        )
    }
}
