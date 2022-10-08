import { ComponentFactoryResolver, Directive, HostListener, Input, OnChanges, ViewContainerRef } from '@angular/core';
import { CARD_MIN_WIDTH, DEFAULT_VIDEO, IVideo, LIST_MIN_WIDTH, VIEW_TYPE } from './helper';
import { ListComponent } from './list/list.component';

@Directive({
  selector: '[appView]'
})
export class ViewDirective implements OnChanges {
  @Input() component: any;
  @Input() video: IVideo = DEFAULT_VIDEO;
  @Input() index!: number;
  @Input() type!: VIEW_TYPE;

  width!: number;
  componentRef: any;

  constructor(
    private readonly _host: ListComponent,
    private readonly _viewContainerRef: ViewContainerRef,
    private readonly _componentFactoryResolver: ComponentFactoryResolver
  ) {}

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this._loadWidth();
    this.componentRef.instance.index = this._getIndexByType();
  }

  ngOnChanges() {    
    this._loadWidth();
    this._loadViewComponent();
  }

  private _loadViewComponent() {
    const _componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.component);
    this._viewContainerRef.clear();

    this.componentRef = this._viewContainerRef.createComponent(_componentFactory);
    (this.componentRef.instance as any).video = this.video;
    (this.componentRef.instance as any).index = this._getIndexByType();
  }

  private _getIndexByType() {
    const _width = this.type === VIEW_TYPE.LIST ? LIST_MIN_WIDTH : CARD_MIN_WIDTH;
    return this._getIndex(_width);
  }

  private _getIndex(width: number) {
    return this.width < width ? 0 : this.index;
  }

  private _loadWidth() {
    this.width = window.innerWidth;
  }
}
