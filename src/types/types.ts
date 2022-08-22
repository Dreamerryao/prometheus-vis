/**
 * types.ts 定义类型
 */
 interface TrackDataBase {
  title: string;
  url: string;
  timestamp: string;
  referrer: string;
  user_agent: string;
}
/**
* ErrorImpl 各种错误的基类接口
*/
export interface ErrorImpl extends TrackDataBase {
  type: "error";
}
/**
* JSError JS内部错误（包括 Promise 错误）
*/
export interface JSError extends ErrorImpl {
  error_type: "jsError";
  message: string;
  stack: string;
}
/**
* ResouceError 资源加载错误
*/
export interface ResourceError extends ErrorImpl {
  error_type: "resourceError";
  filename: string;
  error_message: string;
  tagName: string;
  size: string;
  time: DOMHighResTimeStamp;
}
/**
* BlankError 白屏错误
*/
interface BlankError extends ErrorImpl {
  errorType: "blankError";
  emptyPoints: string;
  screen: string;
  viewPoint: string;
}
/**
* HttpRequest 有关网络请求的数据
*/
export interface HttpRequest extends TrackDataBase {
  type: "api";
  api_type: "xhr" | "fetch";
  method: "get" | "post" | "";
  path_url: string;
  success: boolean;
  status: string;
  duration: DOMHighResTimeStamp;
  request_header: string;
  request_body: string;
  response_header: string;
  response_body: string;
  err_message?: string;
}
export interface PerformanceImpl extends TrackDataBase {
  type: "performance";
}
export interface Timing extends PerformanceImpl {
  perf_type: "timing";
  dns_time: DOMHighResTimeStamp;
  connect_time: DOMHighResTimeStamp;
  ttfb_time: DOMHighResTimeStamp;
  response_time: DOMHighResTimeStamp;
  parse_dom_time: DOMHighResTimeStamp;
  dom_content_loaded_time: DOMHighResTimeStamp;
  time_to_interactive: DOMHighResTimeStamp;
  load_time: DOMHighResTimeStamp;
}
export interface Paint extends PerformanceImpl {
  pref_type: "paint";
  first_paint: DOMHighResTimeStamp;
  first_content_paint: DOMHighResTimeStamp;
  first_meaningful_paint: DOMHighResTimeStamp;
  largest_contentful_paint: DOMHighResTimeStamp;
  first_input_delay: DOMHighResTimeStamp;
}
export interface BehaviorImpl extends TrackDataBase {
  type: "behavior";
  page_url: string;
  uuid: string;
}
export interface Pv extends BehaviorImpl {
  behavior_type: "pv";
}
export interface StayTime extends BehaviorImpl {
  behavior_type: "staytime";
  stay_time: DOMHighResTimeStamp;
}
/**
* 监控数据类型
*/
export declare type TrackData = (JSError | ResourceError | BlankError | HttpRequest | Timing | Paint | Pv | StayTime);
/**
* RequestIdleCallback(callback[, options])
* 中 callback 被传入的参数类型
*/
export declare type Deadline = {
  timeRemaining: () => number;
  didTimeout: boolean;
};
/**
* detectUserAgent 使用到的类型
*/
export declare type Browser = 'welike' | 'vidmate' | 'aol' | 'edge' | 'yandexbrowser' | 'vivaldi' | 'kakaotalk' | 'samsung' | 'chrome' | 'phantomjs' | 'crios' | 'firefox' | 'fxios' | 'opera' | 'ie' | 'bb10' | 'android' | 'ios' | 'safari' | 'facebook' | 'instagram' | 'ios-webview' | 'searchbot';
export declare type OperatingSystem = 'iOS' | 'Android OS' | 'BlackBerry OS' | 'Windows Mobile' | 'Amazon OS' | 'Windows 3.11' | 'Windows 95' | 'Windows 98' | 'Windows 2000' | 'Windows XP' | 'Windows Server 2003' | 'Windows Vista' | 'Windows 7' | 'Windows 8' | 'Windows 8.1' | 'Windows 10' | 'Windows ME' | 'Open BSD' | 'Sun OS' | 'Linux' | 'Mac OS' | 'QNX' | 'BeOS' | 'OS/2' | 'Search Bot';
export declare type UserAgentRule = [Browser, RegExp];
export declare type UserAgentMatch = [Browser, RegExpExecArray] | false;
export declare type OperatingSystemRule = [OperatingSystem, RegExp];
export interface DetectedInfo<N extends string, O, V = null> {
  readonly name: N;
  readonly version: V;
  readonly os: O;
}
export {};
