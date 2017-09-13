import { Component } from "@angular/core";

@Component({
    selector: "ns-app",
    template: `
        <Label class="mylbl"></Label>
    `,
    styles: [`
        .mylbl {
            width: 100;
            height: 100;
            background-color: #1e1e1e;
            animation-name: doit;
            animation-duration: 2s;
            animation-iteration-count: infinite;
            animation-fill-mode: forwards;
            animation-timing-function: cubic-bezier(.43,.22,.03,1);
        }
        @keyframes doit {
            0% { transform: translateX(-250); }
            50% { transform: translateX(0); }
            100% { transform: translateX(800); }
        }
    `]
})

export class AppComponent { }
