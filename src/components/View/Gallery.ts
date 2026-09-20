import { Component } from '../base/Component';
import { IGalleryRender } from '../../types';

export class Gallery extends Component<IGalleryRender> {
    constructor(container: HTMLElement) {
        super(container);
    }

    set items(value: HTMLElement[]) {
        this.container.replaceChildren(...value);
    }
}
