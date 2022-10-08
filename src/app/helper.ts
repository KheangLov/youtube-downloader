import { CardViewComponent } from './list/card-view/card-view.component';
import { ListViewComponent } from './list/list-view/list-view.component';

export interface IVideo {
  id: string;
  title: string;
  url: string;
  image: string;
  duration: string;
  durationRaw: number,
  publishedAt: string;
  views: string;
  viewsRaw: number;
  downloadLink: string;
}

export const DEFAULT_VIDEO: IVideo = {
  id: '',
  title: '',
  url: '',
  image: '',
  duration: '',
  durationRaw: 0,
  publishedAt: '',
  views: '',
  viewsRaw: 0,
  downloadLink: '',
};

export const getFormattedView = (view: number): string => {
  return new Intl.NumberFormat("en-GB", { notation: "compact", compactDisplay: "short" }).format(view);
}

export enum VIEW_TYPE {
  CARD = 'card',
  LIST = 'list',
}

export const CARD_MIN_WIDTH = 576;
export const LIST_MIN_WIDTH = 992;

export interface IView {
  cols: string;
  icon: string;
  type: VIEW_TYPE;
  tooltip: string;
  component: any;
}

export const CARD_VIEW: IView = {
  cols: 'col-12 col-sm-6 col-lg-3',
  icon: 'view_list',
  type: VIEW_TYPE.CARD,
  tooltip: 'Click to change to list view',
  component: CardViewComponent
};

export const LIST_VIEW: IView = {
  cols: 'col-12 col-lg-6',
  icon: 'view_module',
  type: VIEW_TYPE.LIST,
  tooltip: 'Click to change to card view',
  component: ListViewComponent
};

export enum FILE_TYPE {
  MP3 = "mp3",
  MP4 = "mp4",
}

export interface IFile {
  type: FILE_TYPE;
  icon: string;
  tooltip: string;
}

export const MP3: IFile = {
  type: FILE_TYPE.MP3,
  icon: 'videocam',
  tooltip: 'Your current file type is MP3, click to change to MP4'
};

export const MP4: IFile = {
  type: FILE_TYPE.MP4,
  icon: 'mic',
  tooltip: 'Your current file type is MP4, click to change to MP3'
};

export const DEFAULT_SEARCH = 'Cambodian Idol';

export enum FILTER_TYPE {
  NORMAL = 'normal',
  POPULAR = 'popular',
  SHORTEST = 'shortest',
  LONGEST = 'longest',
}

export interface IFilter {
  value: FILTER_TYPE;
  text: string;
  field: string;
  direction?: 'asc' | 'desc';
}

export const FILTER: Array<IFilter> = [
  {
    value: FILTER_TYPE.NORMAL,
    text: 'Normal',
    field: '',
  },
  {
    value: FILTER_TYPE.POPULAR,
    text: 'Most Popular',
    field: 'viewsRaw',
    direction: 'desc',
  },
  {
    value: FILTER_TYPE.SHORTEST,
    text: 'Shortest',
    field: 'durationRaw',
    direction: 'asc',
  },
  {
    value: FILTER_TYPE.LONGEST,
    text: 'Longest',
    field: 'durationRaw',
    direction: 'desc',
  },
];
