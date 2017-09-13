import { Component, ViewChild, ElementRef } from "@angular/core";
import { Label } from 'ui/label';
import * as enums from 'ui/enums';
import { Animation } from "tns-core-modules/ui/animation";

@Component({
    selector: "ns-app",
    template: `
        <Label #thelbl class="mylbl"></Label>
    `,
    styles: [`
        .mylbl {
            width: 100;
            height: 100;
            transform: translate(-250, 0);
            background-color: #1e1e1e;
        }
    `]
})

export class AppComponent {

    @ViewChild('thelbl') mylblRef: ElementRef;
    private get lbl(): Label {
        return this.mylblRef.nativeElement;
    }

    ngOnInit() {
        this.lbl.animate({
            translate: { x: 300, y: 0 },
            duration: 2000,
            iterations: Number.POSITIVE_INFINITY,
            curve: enums.AnimationCurve.cubicBezier(.5, 1, 1, 0)
        });
    }
}
