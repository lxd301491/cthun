import { AbstractCollector } from "./AbstractCollector";
import { replace, reduction } from "../decorators/LifeCycle";
import { parseUrl, dispatchCustomEvent, on, parseHash, off } from "../helpers";

export class PvConllector extends AbstractCollector {
  hackState(e: 'pushState' | 'replaceState') {
    replace(history, e, function (data: any, title: string, url?: string | null) {
      // 调用pushState或replaceState时hack Onpopstate
      replace(window, "onpopstate", function (this: Window) {
        for (var r = arguments.length, a = new Array(r), o = 0; o < r; o++) a[o] = arguments[o];
        return  window._replace_center_.onpopstate.apply(this, a);
      });
      let referer = location.href;
      let f =  window._replace_center_[e].apply(history, [data, title, url]);
      if (!url || url === referer) return f;
      try {
        let l = referer.split("#"),
            h = url.split("#"),
            p = parseUrl(l[0]),
            d = parseUrl(h[0]),
            g = l[1] && l[1].replace(/^\/?(.*)/, "$1"),
            v = h[1] && h[1].replace(/^\/?(.*)/, "$1");
        p !== d ? dispatchCustomEvent("historystatechanged", d) : g !== v && dispatchCustomEvent("historystatechanged", v)
      } catch (m) {
        console.log("[retcode] error in " + e + ": " + m)
      }
      return f
    });
  }

  dehackState(e: 'pushState' | 'replaceState') {
    reduction(history, e);
    reduction(window, 'onpopstate');
  }

  handleHashchange(e: Event) {
    let page = parseHash(location.hash.toLowerCase());
    this.collect(page);
  }

  collect(page?: string) {
    super.collect({
      dot: document.title,
      dol: location.href,
      dr: document.referrer,
      dpr: window.devicePixelRatio,
      de: document.charset,
      page: page ? page : window.location.href,
      msg: "",
      ms: "pv",
      ml: "info"
    })
  }

  handleHistorystatechange(e: CustomEvent) {
    let page = parseHash(e.detail.toLowerCase());
    this.collect(page);
  }
  
  start(): void {
    this.hackState('pushState');
    this.hackState('replaceState');
    on('hashchange', this.handleHashchange.bind(this));
    on('historystatechanged', this.handleHistorystatechange.bind(this));
    this.collect();

    this.isRunning = true;
  }

  stop(): void {
    this.dehackState('pushState');
    this.dehackState('replaceState');
    off('hashchange', this.handleHashchange.bind(this));
    off('historystatechanged', this.handleHistorystatechange.bind(this));

    this.isRunning = false;
  }
}