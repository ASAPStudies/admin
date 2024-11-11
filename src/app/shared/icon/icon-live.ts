import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'icon-live',
    template: `
        <ng-template #template>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
            [ngClass]="class" fill="currentColor" class="bi bi-person-video3" viewBox="0 0 16 16">
                <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2" />
                <path
                    d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783Q16 12.312 16 12V4a2 2 0 0 0-2-2z"
                />
            </svg>
        </ng-template>
    `,
})
export class IconLiveComponent {
    @Input() class: any = '';
    @ViewChild('template', { static: true }) template: any;

    constructor(private viewContainerRef: ViewContainerRef) {}

    ngOnInit() {
        this.viewContainerRef.createEmbeddedView(this.template);
        this.viewContainerRef.element.nativeElement.remove();
    }
}
