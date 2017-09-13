import { Component, ViewChild, ElementRef } from "@angular/core";
import { Label } from 'ui/label';
import { Observable, Scheduler } from "rxjs";
import * as d3 from 'd3-ease';

interface Range {
    from: number;
    to: number;
}

const msElapsed = (scheduler = Scheduler.animationFrame) =>
    Observable.defer(() => {
        const start = scheduler.now();
        return Observable.interval(0, scheduler)
            .map(() => scheduler.now() - start);
    });

const duration = (ms, scheduler = Scheduler.animationFrame) =>
    msElapsed(scheduler)
        .map(elapsedMs => elapsedMs / ms)
        .takeWhile(t => t <= 1);

const amountFromTo = (range: Range) =>
    (t) => range.from + t * (range.to - range.from);


@Component({
    selector: "ns-app",
    template: `
        <Label #thelbl class="mylbl"></Label>
    `,
    styles: [`
        .mylbl {
            width: 100;
            height: 100;
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
        duration(1000)
            .map(d3.easeSinOut)
            .map(amountFromTo({ from: -280, to: 0 }))
            .do(newVal => this.lbl.translateX = newVal)
            .subscribe();

        duration(1000)
            .delay(1500)
            .map(d3.easeSinOut)
            .map(amountFromTo({ from: 0, to: 800 }))
            .do(newVal => this.lbl.translateX = newVal)
            .subscribe();

    }
}
